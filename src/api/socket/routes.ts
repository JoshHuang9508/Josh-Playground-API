import { Socket } from 'socket.io';

import SocketServer, { SocketRequestHandler, SocketRequestHandlerWithAck } from '@/api/socket';
import * as SocketHandlers from '@/api/socket/handlers';

export default class EventRouters {
  private socket: Socket;

  constructor(socket: Socket) {
    this.socket = socket;
  }

  addRoute(path: string, handler: SocketRequestHandler) {
    this.socket.on(path, async (...datas: any[]) => handler.handle(this.socket.data.userId, ...datas).then((res) => SocketServer.ProcessResponses(res)));
  }

  addAckRoute(path: string, handler: SocketRequestHandlerWithAck) {
    this.socket.on(path, async (payload: any, ack: (res: any) => void) => handler.handle(this.socket.data.userId, payload, ack).then((res) => SocketServer.ProcessResponses(res)));
  }
}

export const EventRoutesInit = (eventRouter: EventRouters) => {
  eventRouter.addRoute('playerJoin', SocketHandlers.PlayerJoinHandler);
  eventRouter.addRoute('playerSetUsername', SocketHandlers.PlayerSetUsernameHandler);
  eventRouter.addRoute('playerAddLog', SocketHandlers.PlayerAddLogHandler);
  eventRouter.addRoute('playerSetState', SocketHandlers.PlayerSetStateHandler);
  eventRouter.addRoute('playerOnDuration', SocketHandlers.PlayerOnDurationHandler);
  eventRouter.addRoute('playerOnProgress', SocketHandlers.PlayerOnProgressHandler);
  eventRouter.addRoute('playerOnEnd', SocketHandlers.PlayerOnEndHandler);
  eventRouter.addRoute('playerPlay', SocketHandlers.PlayerPlayHandler);
  eventRouter.addRoute('playerPause', SocketHandlers.PlayerPauseHandler);
  eventRouter.addRoute('playerRefresh', SocketHandlers.PlayerRefreshHandler);
  eventRouter.addRoute('playerAddTrack', SocketHandlers.PlayerAddTrackHandler);
  eventRouter.addRoute('playerAddTracks', SocketHandlers.PlayerAddTracksHandler);
  eventRouter.addRoute('playerRemoveTrack', SocketHandlers.PlayerRemoveTrackHandler);
  eventRouter.addRoute('playerSetTrackQueue', SocketHandlers.PlayerSetTrackQueueHandler);
  eventRouter.addRoute('playerNextTrack', SocketHandlers.PlayerNextTrackHandler);
  eventRouter.addRoute('playerPrevTrack', SocketHandlers.PlayerPrevTrackHandler);
  eventRouter.addRoute('playerSetTrackIndex', SocketHandlers.PlayerSetTrackIndexHandler);
  eventRouter.addRoute('playerSetPlaybackRate', SocketHandlers.PlayerSetPlaybackRateHandler);
  eventRouter.addRoute('playerSetLoop', SocketHandlers.PlayerSetLoopHandler);
  eventRouter.addRoute('playerSetRandom', SocketHandlers.PlayerSetRandomHandler);
  eventRouter.addRoute('playerSeek', SocketHandlers.PlayerSeekHandler);
};
