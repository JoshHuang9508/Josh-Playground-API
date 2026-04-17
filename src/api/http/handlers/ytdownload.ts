import ytdl from 'ytdl-core';

import { DownloadRequestHandler, DownloadResponseType } from '@/api/http';

export const YtDownloadMp4Handler: DownloadRequestHandler = {
  PART: 'HTTP',

  async handle<T>(data: T): Promise<DownloadResponseType> {
    const { videoId } = data as { videoId?: string };

    if (!videoId) {
      return { success: false, code: 400, message: '缺少 videoId 參數' };
    }

    try {
      const info = await ytdl.getInfo(`https://www.youtube.com/watch?v=${videoId}`);
      if (info.videoDetails.isLiveContent) {
        return { success: false, code: 400, message: '無法下載直播影片' };
      }
      return {
        success: true,
        stream: ytdl(`https://www.youtube.com/watch?v=${videoId}`, { filter: 'audioandvideo', quality: 'highest' }),
        filename: `${videoId}.mp4`,
        contentType: 'video/mp4',
      };
    } catch (error: any) {
      return { success: false, code: 500, message: '無法獲取影片資訊' };
    }
  },
};

export const YtDownloadMp3Handler: DownloadRequestHandler = {
  PART: 'HTTP',

  async handle<T>(data: T): Promise<DownloadResponseType> {
    const { videoId } = data as { videoId?: string };

    if (!videoId) {
      return { success: false, code: 400, message: '缺少 videoId 參數' };
    }

    try {
      const info = await ytdl.getInfo(`https://www.youtube.com/watch?v=${videoId}`);
      if (info.videoDetails.isLiveContent) {
        return { success: false, code: 400, message: '無法下載直播影片' };
      }
      return {
        success: true,
        stream: ytdl(`https://www.youtube.com/watch?v=${videoId}`, { filter: 'audioonly', quality: 'highestaudio' }),
        filename: `${videoId}.mp3`,
        contentType: 'audio/mpeg',
      };
    } catch (error: any) {
      return { success: false, code: 500, message: '無法獲取影片資訊' };
    }
  },
};
