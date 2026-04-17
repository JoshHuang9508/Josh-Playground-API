import http from 'http';
import { Server, Socket } from 'socket.io';

import Logger from '@/logger';

import EventRouters, { EventRoutesInit } from '@/api/socket/routes';

import * as PlayerService from '@/services/player';

export type EmitTarget =
  | { scope: 'user'; userId: string } // socket.emit
  | { scope: 'room'; roomId: string } // io.to(roomId).emit
  | { scope: 'namespace' } // io.emit
  | { scope: 'roomExceptUser'; roomId: string; userId: string } // io.to(roomId).except(userId).emit
  | { scope: 'namespaceExceptUser'; userId: string }; // io.except(userId).emit

export type SocketResponseType =
  | { kind: 'emit'; target: EmitTarget; event: string; payload: any[] } // .emit(event, ...payload)
  | { kind: 'join'; target: { scope: 'user'; userId: string }; roomId: string } // .join(roomId)
  | { kind: 'leave'; target: { scope: 'user'; userId: string }; roomId: string } // .leave(roomId)
  | { kind: 'disconnect'; target: { scope: 'user'; userId: string } }; // .disconnect()

export default class SocketServer {
  static PART = 'SOCKET';

  static io: Server;
  static userSocketMap: Map<string, Socket> = new Map();

  static _initPromise: Promise<void> | null = null;

  static getSocket(userId: string) {
    const socket = this.userSocketMap.get(userId);
    if (!socket) return null;
    return socket;
  }

  static ProcessResponses(responses: SocketResponseType[]) {
    for (const response of responses) {
      const socket = 'userId' in response.target ? SocketServer.getSocket(response.target.userId) : null;
      const socketId = socket?.id ?? '';

      switch (response.kind) {
        case 'emit':
          switch (response.target.scope) {
            case 'user':
              socket?.emit(response.event, ...response.payload);
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
                .except(socketId)
                .emit(response.event, ...response.payload);
              break;
          }
          break;
        case 'join':
          socket?.join(response.roomId);
          break;
        case 'leave':
          socket?.leave(response.roomId);
          break;
        case 'disconnect':
          socket?.disconnect();
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
        const userId = socket.data.userId as string | undefined;
        if (userId && PlayerService.users[userId]) {
          PlayerService.addLog(`${PlayerService.users[userId]} 離開了房間`);
          PlayerService.removeUser(userId);
          this.io.emit('receiveLog', PlayerService.logs);
          this.io.emit('receiveUsers', PlayerService.users);
        }
      });
    });

    new Logger(this.PART).info('Socket Server initialized');
  }
}

export interface SocketRequestHandler {
  handle(userId: string, ...datas: any[]): Promise<SocketResponseType[]>;
  PART: string;
}

export interface SocketRequestHandlerWithAck {
  handle(userId: string, payload: any, ack: (res: any) => void): Promise<SocketResponseType[]>;
  PART: string;
}
