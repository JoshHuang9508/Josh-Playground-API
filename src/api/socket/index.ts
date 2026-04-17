import http from 'http';
import { Server, Socket } from 'socket.io';

import Logger from '@/logger';

import EventRouters, { EventRoutesInit } from '@/api/socket/routes';

import * as PlayerService from '@/services/player';

export type EmitTarget =
  | { scope: 'user'; socketId: string } // socket.emit
  | { scope: 'room'; roomId: string } // io.to(roomId).emit
  | { scope: 'namespace' } // io.emit
  | { scope: 'roomExceptUser'; roomId: string; socketId: string } // io.to(roomId).except(socketId).emit
  | { scope: 'namespaceExceptUser'; socketId: string }; // io.except(socketId).emit

export type SocketResponseType =
  | { kind: 'emit'; target: EmitTarget; event: string; payload: any[] } // .emit(event, ...payload)
  | { kind: 'join'; target: { scope: 'user'; socketId: string }; roomId: string } // .join(roomId)
  | { kind: 'leave'; target: { scope: 'user'; socketId: string }; roomId: string } // .leave(roomId)
  | { kind: 'disconnect'; target: { scope: 'user'; socketId: string } }; // .disconnect()

export default class SocketServer {
  static PART = 'SOCKET';

  static io: Server;

  static _initPromise: Promise<void> | null = null;

  static ProcessResponses(responses: SocketResponseType[]) {
    for (const response of responses) {
      switch (response.kind) {
        case 'emit':
          switch (response.target.scope) {
            case 'user':
              this.io.to(response.target.socketId).emit(response.event, ...response.payload);
              break;
            case 'room':
              this.io.to(response.target.roomId).emit(response.event, ...response.payload);
              break;
            case 'namespace':
              this.io.emit(response.event, ...response.payload);
              break;
            case 'roomExceptUser':
              this.io
                .to(response.target.roomId)
                .except(response.target.socketId)
                .emit(response.event, ...response.payload);
              break;
          }
          break;
        case 'join':
          this.io.sockets.sockets.get(response.target.socketId)?.join(response.roomId);
          break;
        case 'leave':
          this.io.sockets.sockets.get(response.target.socketId)?.leave(response.roomId);
          break;
        case 'disconnect':
          this.io.sockets.sockets.get(response.target.socketId)?.disconnect();
          break;
      }
    }
  }

  static async setup(server: http.Server): Promise<void> {
    new Logger(this.PART).info('Initializing Socket Server...');

    this.io = new Server(server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });

    PlayerService.initPlayerInterval(this.io);

    this.io.on('connection', async (socket: Socket) => {
      EventRoutesInit(new EventRouters(socket));

      socket.on('disconnect', () => {
        const socketId = socket.id as string | undefined;
        if (socketId && PlayerService.users[socketId]) {
          PlayerService.addLog(`${PlayerService.users[socketId]} 離開了房間`);
          PlayerService.removeUser(socketId);
          this.io.emit('receiveLog', PlayerService.logs);
          this.io.emit('receiveUsers', PlayerService.users);
        }
      });
    });

    new Logger(this.PART).info('Socket Server initialized');
  }
}

export interface SocketRequestHandler {
  handle(socketId: string, ...datas: any[]): Promise<SocketResponseType[]>;
  PART: string;
}

export interface SocketRequestHandlerWithAck {
  handle(socketId: string, payload: any, ack: (res: any) => void): Promise<SocketResponseType[]>;
  PART: string;
}
