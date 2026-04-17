import { Server } from 'socket.io';

export const logLimit = 20;

export let trackIndex = 0;
export let playerState = {
  playing: false,
  played: 0,
  playedSeconds: 0,
  loaded: 0,
  loadedSeconds: 0,
  duration: 0,
  playbackRate: 1,
  loop: false,
  random: false,
  trackQueue: [] as any[],
  currentTrack: null as any,
  index: 0,
  isEnd: false,
};
export let logs: string[] = [];
export let users: { [userId: string]: string } = {};

export const setTrackIndex = (index: number) => {
  trackIndex = index;
};

export const addLog = (message: string) => {
  logs = [message, ...logs].slice(0, logLimit);
};

export const removeUser = (userId: string) => {
  delete users[userId];
};

export const updateCurrentTrack = (index: number, io: Server) => {
  const currentTrack = playerState.currentTrack;
  const newTrack = playerState.trackQueue[index] ?? null;
  if (currentTrack && newTrack && newTrack.id !== currentTrack.id) {
    io.emit('seek', 0);
  }
  playerState.currentTrack = newTrack;
  playerState.index = index;
  io.emit('receivePlayerState', playerState);
};

const handleEnd = (io: Server) => {
  playerState.isEnd = false;
  if (playerState.random) {
    trackIndex = Math.floor(Math.random() * playerState.trackQueue.length);
    updateCurrentTrack(trackIndex, io);
  } else if (playerState.trackQueue.length === 1) {
    io.emit('seek', 0);
  } else {
    trackIndex = trackIndex === playerState.trackQueue.length - 1 ? 0 : trackIndex + 1;
    updateCurrentTrack(trackIndex, io);
  }
};

export const initPlayerInterval = (io: Server) => {
  setInterval(() => {
    if (playerState.isEnd) handleEnd(io);
  }, 1000);
};
