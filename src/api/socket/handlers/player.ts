import { SocketRequestHandler, SocketResponseType } from '@/api/socket';
import * as PlayerService from '@/services/player';

export const PlayerJoinHandler: SocketRequestHandler = {
  PART: 'SOCKET',

  async handle(socketId: string, username: string): Promise<SocketResponseType[]> {
    PlayerService.addLog(`${username} 加入了房間`);
    PlayerService.users[socketId] = username;

    return [
      { kind: 'emit', target: { scope: 'namespace' }, event: 'player:logs', payload: [PlayerService.logs] },
      { kind: 'emit', target: { scope: 'namespace' }, event: 'player:users', payload: [PlayerService.users] },
      { kind: 'emit', target: { scope: 'user', socketId: socketId }, event: 'player:player_state', payload: [PlayerService.playerState] },
    ];
  },
};

export const PlayerSetUsernameHandler: SocketRequestHandler = {
  PART: 'SOCKET',

  async handle(socketId: string, username: string): Promise<SocketResponseType[]> {
    PlayerService.users[socketId] = username;
    return [{ kind: 'emit', target: { scope: 'namespace' }, event: 'player:users', payload: [PlayerService.users] }];
  },
};

export const PlayerAddLogHandler: SocketRequestHandler = {
  PART: 'SOCKET',

  async handle(socketId: string, newLog: string): Promise<SocketResponseType[]> {
    PlayerService.addLog(newLog);
    return [{ kind: 'emit', target: { scope: 'namespace' }, event: 'player:logs', payload: [PlayerService.logs] }];
  },
};

export const PlayerSetStateHandler: SocketRequestHandler = {
  PART: 'SOCKET',

  async handle(socketId: string, state: Partial<typeof PlayerService.playerState>): Promise<SocketResponseType[]> {
    Object.assign(PlayerService.playerState, state);
    return [{ kind: 'emit', target: { scope: 'namespace' }, event: 'player:player_state', payload: [PlayerService.playerState] }];
  },
};

export const PlayerOnDurationHandler: SocketRequestHandler = {
  PART: 'SOCKET',

  async handle(socketId: string, duration: number): Promise<SocketResponseType[]> {
    PlayerService.playerState.duration = duration;
    return [];
  },
};

export const PlayerOnProgressHandler: SocketRequestHandler = {
  PART: 'SOCKET',

  async handle(socketId: string, state: { played: number; playedSeconds: number; loaded: number; loadedSeconds: number }): Promise<SocketResponseType[]> {
    PlayerService.playerState.played = state.played;
    PlayerService.playerState.playedSeconds = state.playedSeconds;
    PlayerService.playerState.loaded = state.loaded;
    PlayerService.playerState.loadedSeconds = state.loadedSeconds;
    return [];
  },
};

export const PlayerOnEndHandler: SocketRequestHandler = {
  PART: 'SOCKET',

  async handle(socketId: string): Promise<SocketResponseType[]> {
    PlayerService.playerState.isEnd = true;
    return [];
  },
};

export const PlayerPlayHandler: SocketRequestHandler = {
  PART: 'SOCKET',

  async handle(socketId: string): Promise<SocketResponseType[]> {
    PlayerService.playerState.playing = true;
    return [{ kind: 'emit', target: { scope: 'namespace' }, event: 'player:player_state', payload: [PlayerService.playerState] }];
  },
};

export const PlayerPauseHandler: SocketRequestHandler = {
  PART: 'SOCKET',

  async handle(socketId: string): Promise<SocketResponseType[]> {
    PlayerService.playerState.playing = false;
    return [{ kind: 'emit', target: { scope: 'namespace' }, event: 'player:player_state', payload: [PlayerService.playerState] }];
  },
};

export const PlayerRefreshHandler: SocketRequestHandler = {
  PART: 'SOCKET',

  async handle(socketId: string): Promise<SocketResponseType[]> {
    return [
      { kind: 'emit', target: { scope: 'namespace' }, event: 'player:player_state', payload: [PlayerService.playerState] },
      { kind: 'emit', target: { scope: 'namespace' }, event: 'player:seek', payload: [PlayerService.playerState.playedSeconds] },
    ];
  },
};

export const PlayerAddTrackHandler: SocketRequestHandler = {
  PART: 'SOCKET',

  async handle(socketId: string, track: any): Promise<SocketResponseType[]> {
    PlayerService.playerState.trackQueue.push(track);
    const newTrack = PlayerService.playerState.trackQueue[PlayerService.trackIndex] ?? null;
    PlayerService.playerState.currentTrack = newTrack;
    PlayerService.playerState.index = PlayerService.trackIndex;
    return [{ kind: 'emit', target: { scope: 'namespace' }, event: 'player:player_state', payload: [PlayerService.playerState] }];
  },
};

export const PlayerAddTracksHandler: SocketRequestHandler = {
  PART: 'SOCKET',

  async handle(socketId: string, tracks: any[]): Promise<SocketResponseType[]> {
    PlayerService.playerState.trackQueue.push(...tracks);
    const newTrack = PlayerService.playerState.trackQueue[PlayerService.trackIndex] ?? null;
    PlayerService.playerState.currentTrack = newTrack;
    PlayerService.playerState.index = PlayerService.trackIndex;
    return [{ kind: 'emit', target: { scope: 'namespace' }, event: 'player:player_state', payload: [PlayerService.playerState] }];
  },
};

export const PlayerRemoveTrackHandler: SocketRequestHandler = {
  PART: 'SOCKET',

  async handle(socketId: string, index: number): Promise<SocketResponseType[]> {
    PlayerService.playerState.trackQueue.splice(index, 1);
    if (index < PlayerService.trackIndex) PlayerService.setTrackIndex(PlayerService.trackIndex - 1);
    PlayerService.setTrackIndex(Math.min(PlayerService.trackIndex, PlayerService.playerState.trackQueue.length - 1));
    PlayerService.setTrackIndex(Math.max(PlayerService.trackIndex, 0));
    const newTrack = PlayerService.playerState.trackQueue[PlayerService.trackIndex] ?? null;
    PlayerService.playerState.currentTrack = newTrack;
    PlayerService.playerState.index = PlayerService.trackIndex;
    return [{ kind: 'emit', target: { scope: 'namespace' }, event: 'player:player_state', payload: [PlayerService.playerState] }];
  },
};

export const PlayerSetTrackQueueHandler: SocketRequestHandler = {
  PART: 'SOCKET',

  async handle(socketId: string, trackQueue: any[]): Promise<SocketResponseType[]> {
    PlayerService.playerState.trackQueue = trackQueue;
    PlayerService.setTrackIndex(0);
    const newTrack = PlayerService.playerState.trackQueue[0] ?? null;
    PlayerService.playerState.currentTrack = newTrack;
    PlayerService.playerState.index = 0;
    return [{ kind: 'emit', target: { scope: 'namespace' }, event: 'player:player_state', payload: [PlayerService.playerState] }];
  },
};

export const PlayerNextTrackHandler: SocketRequestHandler = {
  PART: 'SOCKET',

  async handle(socketId: string): Promise<SocketResponseType[]> {
    PlayerService.setTrackIndex(PlayerService.trackIndex === PlayerService.playerState.trackQueue.length - 1 ? 0 : PlayerService.trackIndex + 1);
    const currentTrack = PlayerService.playerState.currentTrack;
    const newTrack = PlayerService.playerState.trackQueue[PlayerService.trackIndex] ?? null;
    const responses: SocketResponseType[] = [];
    if (currentTrack && newTrack && newTrack.id !== currentTrack.id) {
      responses.push({ kind: 'emit', target: { scope: 'namespace' }, event: 'player:seek', payload: [0] });
    }
    PlayerService.playerState.currentTrack = newTrack;
    PlayerService.playerState.index = PlayerService.trackIndex;
    responses.push({ kind: 'emit', target: { scope: 'namespace' }, event: 'player:player_state', payload: [PlayerService.playerState] });
    return responses;
  },
};

export const PlayerPrevTrackHandler: SocketRequestHandler = {
  PART: 'SOCKET',

  async handle(socketId: string): Promise<SocketResponseType[]> {
    PlayerService.setTrackIndex(PlayerService.trackIndex === 0 ? PlayerService.playerState.trackQueue.length - 1 : PlayerService.trackIndex - 1);
    const currentTrack = PlayerService.playerState.currentTrack;
    const newTrack = PlayerService.playerState.trackQueue[PlayerService.trackIndex] ?? null;
    const responses: SocketResponseType[] = [];
    if (currentTrack && newTrack && newTrack.id !== currentTrack.id) {
      responses.push({ kind: 'emit', target: { scope: 'namespace' }, event: 'player:seek', payload: [0] });
    }
    PlayerService.playerState.currentTrack = newTrack;
    PlayerService.playerState.index = PlayerService.trackIndex;
    responses.push({ kind: 'emit', target: { scope: 'namespace' }, event: 'player:player_state', payload: [PlayerService.playerState] });
    return responses;
  },
};

export const PlayerSetTrackIndexHandler: SocketRequestHandler = {
  PART: 'SOCKET',

  async handle(socketId: string, index: number): Promise<SocketResponseType[]> {
    PlayerService.setTrackIndex(index);
    const currentTrack = PlayerService.playerState.currentTrack;
    const newTrack = PlayerService.playerState.trackQueue[index] ?? null;
    const responses: SocketResponseType[] = [];
    if (currentTrack && newTrack && newTrack.id !== currentTrack.id) {
      responses.push({ kind: 'emit', target: { scope: 'namespace' }, event: 'player:seek', payload: [0] });
    }
    PlayerService.playerState.currentTrack = newTrack;
    PlayerService.playerState.index = index;
    responses.push({ kind: 'emit', target: { scope: 'namespace' }, event: 'player:player_state', payload: [PlayerService.playerState] });
    return responses;
  },
};

export const PlayerSetPlaybackRateHandler: SocketRequestHandler = {
  PART: 'SOCKET',

  async handle(socketId: string, rate: number): Promise<SocketResponseType[]> {
    PlayerService.playerState.playbackRate = rate;
    return [{ kind: 'emit', target: { scope: 'namespace' }, event: 'player:player_state', payload: [PlayerService.playerState] }];
  },
};

export const PlayerSetLoopHandler: SocketRequestHandler = {
  PART: 'SOCKET',

  async handle(socketId: string, loop: boolean): Promise<SocketResponseType[]> {
    PlayerService.playerState.loop = loop;
    return [{ kind: 'emit', target: { scope: 'namespace' }, event: 'player:player_state', payload: [PlayerService.playerState] }];
  },
};

export const PlayerSetRandomHandler: SocketRequestHandler = {
  PART: 'SOCKET',

  async handle(socketId: string, random: boolean): Promise<SocketResponseType[]> {
    PlayerService.playerState.random = random;
    return [{ kind: 'emit', target: { scope: 'namespace' }, event: 'player:player_state', payload: [PlayerService.playerState] }];
  },
};

export const PlayerSetVibeHandler: SocketRequestHandler = {
  PART: 'SOCKET',

  async handle(socketId: string, vibe: string): Promise<SocketResponseType[]> {
    return [{ kind: 'emit', target: { scope: 'namespace' }, event: 'player:vibe', payload: [vibe] }];
  },
};

export const PlayerSeekHandler: SocketRequestHandler = {
  PART: 'SOCKET',

  async handle(socketId: string, time: number): Promise<SocketResponseType[]> {
    return [{ kind: 'emit', target: { scope: 'namespace' }, event: 'player:seek', payload: [time] }];
  },
};
