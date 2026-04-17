import { Socket } from 'socket.io';

import SocketServer, { SocketRequestHandler, SocketRequestHandlerWithAck } from '@/api/socket';
import * as SocketHandlers from '@/api/socket/handlers';

export default class EventRouters {
  private socket: Socket;

  constructor(socket: Socket) {
    this.socket = socket;
  }

  addRoute(path: string, handler: SocketRequestHandler) {
    this.socket.on(path, async (...datas: any[]) => handler.handle(this.socket.id, ...datas).then((res) => SocketServer.ProcessResponses(res)));
  }

  addAckRoute(path: string, handler: SocketRequestHandlerWithAck) {
    this.socket.on(path, async (payload: any, ack: (res: any) => void) => handler.handle(this.socket.id, payload, ack).then((res) => SocketServer.ProcessResponses(res)));
  }
}

export const EventRoutesInit = (eventRouter: EventRouters) => {
  eventRouter.addRoute('player:join', SocketHandlers.PlayerJoinHandler);
  eventRouter.addRoute('player:set_username', SocketHandlers.PlayerSetUsernameHandler);
  eventRouter.addRoute('player:add_log', SocketHandlers.PlayerAddLogHandler);
  eventRouter.addRoute('player:set_state', SocketHandlers.PlayerSetStateHandler);
  eventRouter.addRoute('player:duration', SocketHandlers.PlayerOnDurationHandler);
  eventRouter.addRoute('player:progress', SocketHandlers.PlayerOnProgressHandler);
  eventRouter.addRoute('player:end', SocketHandlers.PlayerOnEndHandler);
  eventRouter.addRoute('player:play', SocketHandlers.PlayerPlayHandler);
  eventRouter.addRoute('player:pause', SocketHandlers.PlayerPauseHandler);
  eventRouter.addRoute('player:refresh', SocketHandlers.PlayerRefreshHandler);
  eventRouter.addRoute('player:add_track', SocketHandlers.PlayerAddTrackHandler);
  eventRouter.addRoute('player:add_tracks', SocketHandlers.PlayerAddTracksHandler);
  eventRouter.addRoute('player:remove_track', SocketHandlers.PlayerRemoveTrackHandler);
  eventRouter.addRoute('player:set_track_queue', SocketHandlers.PlayerSetTrackQueueHandler);
  eventRouter.addRoute('player:next_track', SocketHandlers.PlayerNextTrackHandler);
  eventRouter.addRoute('player:prev_track', SocketHandlers.PlayerPrevTrackHandler);
  eventRouter.addRoute('player:set_track_index', SocketHandlers.PlayerSetTrackIndexHandler);
  eventRouter.addRoute('player:set_playback_rate', SocketHandlers.PlayerSetPlaybackRateHandler);
  eventRouter.addRoute('player:set_loop', SocketHandlers.PlayerSetLoopHandler);
  eventRouter.addRoute('player:set_random', SocketHandlers.PlayerSetRandomHandler);
  eventRouter.addRoute('player:seek', SocketHandlers.PlayerSeekHandler);
};
