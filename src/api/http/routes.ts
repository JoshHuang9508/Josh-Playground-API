import { IncomingHttpHeaders } from 'http';

import { RequestHandler, ResponseType } from '@/api/http';
import * as HttpHandlers from '@/api/http/handlers';

export class PostRouters {
  static routes: { [key: string]: RequestHandler } = {};

  static addRoute(path: string, handler: RequestHandler): void {
    if (PostRouters.routes[path]) {
      throw new Error(`Route already exists: ${path}`);
    }
    PostRouters.routes[path] = handler;
  }

  static async handle(path: string, data: any, headers: IncomingHttpHeaders): Promise<ResponseType> {
    if (!PostRouters.routes[path]) {
      return {
        success: false,
        code: 404,
        message: 'Route not found',
      };
    }
    return await PostRouters.routes[path].handle<Record<string, any>>(data, headers);
  }
}

export class GetRouters {
  static routes: { [key: string]: RequestHandler } = {};

  static addRoute(path: string, handler: RequestHandler): void {
    if (GetRouters.routes[path]) {
      throw new Error(`Route already exists: ${path}`);
    }
    GetRouters.routes[path] = handler;
  }

  static async handle(path: string, query: any, headers: IncomingHttpHeaders): Promise<ResponseType> {
    if (!GetRouters.routes[path]) {
      return {
        success: false,
        code: 404,
        message: 'Route not found',
      };
    }
    return await GetRouters.routes[path].handle<URLSearchParams>(query, headers);
  }
}

export const PostRoutesInit = () => {};

export const GetRoutesInit = () => {
  GetRouters.addRoute('/api/ytdl', HttpHandlers.YtdlHandler);
  GetRouters.addRoute('/api/ytpl', HttpHandlers.YtplHandler);
};
