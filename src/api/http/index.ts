import http, { IncomingHttpHeaders, IncomingMessage, ServerResponse } from 'http';
import { IncomingForm } from 'formidable';

import { PostRouters, GetRouters, PostRoutesInit, GetRoutesInit } from '@/api/http/routes';
import * as HttpHandlers from '@/api/http/handlers';

import Logger from '@/logger';

import { serverConfig } from '@/configs';

export type ResponseType = { success: true; code: number; message: string; data: any } | { success: false; code: number; message: string };

export type DownloadResponseType = { success: true; stream: NodeJS.ReadableStream; filename: string; contentType: string } | { success: false; code: number; message: string };

export default class HttpServer {
  static PART = 'HTTP';

  static server: http.Server;
  static requestCountMap: Map<string, number> = new Map();

  private static sendImage = (res: ServerResponse, response: ResponseType) => {
    if (response.success) {
      res.writeHead(200, {
        'Content-Type': 'image/webp',
        'Cache-Control': 'public, max-age=31536000, immutable',
      });
      res.end(response.data);
    } else {
      res.writeHead(response.code, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: response.message }));
    }
  };

  private static sendResponse = (res: ServerResponse, response: ResponseType) => {
    if (response.success) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 200, message: response.message, data: response.data }));
    } else {
      res.writeHead(response.code, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: response.message }));
    }
  };

  private static sendDownload = (res: ServerResponse, response: DownloadResponseType) => {
    if (response.success) {
      res.writeHead(200, {
        'Content-Disposition': `attachment; filename="${response.filename}"`,
        'Content-Type': response.contentType,
      });
      response.stream.pipe(res);
    } else {
      res.writeHead(response.code, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: response.message }));
    }
  };

  private static sendOptions = (res: ServerResponse) => {
    res.writeHead(200);
    res.end();
  };

  static parseForm = (req: IncomingMessage) => {
    const form = new IncomingForm();
    return new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ ...fields, ...files });
      });
    });
  };

  static async setup(): Promise<void> {
    new Logger(this.PART).info('Initializing HTTP Server...');

    PostRoutesInit();
    GetRoutesInit();

    const server = http.createServer(async (req, res) => {
      const origin = req.headers.origin;
      const allowed = serverConfig.allowedOrigins;
      if (allowed === '*') {
        res.setHeader('Access-Control-Allow-Origin', '*');
      } else if (origin && allowed.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Vary', 'Origin');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
      }
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, DELETE, PUT');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, ngrok-skip-browser-warning');
      res.setHeader('Access-Control-Max-Age', '86400');

      if (req.method === 'OPTIONS') {
        this.sendOptions(res);
        return;
      }

      if (req.method === 'GET') {
        let response: ResponseType | null = null;
        const [path, rawQuery] = req.url?.split('?') || [];
        const query = new URLSearchParams(rawQuery || '');
        const data = Object.fromEntries(query.entries());

        if (!req.url) req.url = '/';
        if (path === '/api/ytdownload-mp4') {
          const key = `${req.method}:${path}`;
          const count = this.requestCountMap.get(key) || 0;
          this.requestCountMap.set(key, count + 1);
          const downloadResponse = await HttpHandlers.YtDownloadMp4Handler.handle(data);
          this.sendDownload(res, downloadResponse);
          return;
        } else if (path === '/api/ytdownload-mp3') {
          const key = `${req.method}:${path}`;
          const count = this.requestCountMap.get(key) || 0;
          this.requestCountMap.set(key, count + 1);
          const downloadResponse = await HttpHandlers.YtDownloadMp3Handler.handle(data);
          this.sendDownload(res, downloadResponse);
          return;
        } else {
          const key = `${req.method}:${path}`;
          const count = this.requestCountMap.get(key) || 0;
          this.requestCountMap.set(key, count + 1);
          response = await GetRouters.handle(path, data, req.headers);
          this.sendResponse(res, response);
          return;
        }
      }

      if (req.method === 'POST') {
        let response: ResponseType | null = null;
        if (req.headers['content-type'] === 'application/json') {
          let data = '';
          req.on('data', (chunk) => {
            data += chunk.toString();
          });
          req.on('end', async () => {
            data = JSON.parse(data);

            if (!req.url) req.url = '/';
            const key = `${req.method}:${req.url || '/'}`;
            const count = this.requestCountMap.get(key) || 0;
            this.requestCountMap.set(key, count + 1);
            response = await PostRouters.handle(req.url, data, req.headers);
            this.sendResponse(res, response);
            return;
          });
          return;
        } else {
          const data = await this.parseForm(req);

          if (!req.url) req.url = '/';
          const key = `${req.method}:${req.url || '/'}`;
          const count = this.requestCountMap.get(key) || 0;
          this.requestCountMap.set(key, count + 1);
          response = await PostRouters.handle(req.url, data, req.headers);
          this.sendResponse(res, response);
          return;
        }
      }

      res.writeHead(405, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Method not allowed' }));
      return;
    });

    server.listen(serverConfig.port, () => {
      // new Logger(this.PART).info(`Server is running on port ${serverConfig.port}`);
    });

    server.on('error', (error: Error) => {
      new Logger(this.PART).error(`Server error: ${error.message}`);
    });

    this.server = server;

    new Logger(this.PART).info(`HTTP Server initialized on port ${serverConfig.port}`);
  }
}

export interface RequestHandler {
  handle: (<T>(data: T, headers: IncomingHttpHeaders) => Promise<ResponseType>) | (<T>(data: T) => Promise<ResponseType>);
  PART: string;
}

export interface DownloadRequestHandler {
  handle: <T>(data: T) => Promise<DownloadResponseType>;
  PART: string;
}
