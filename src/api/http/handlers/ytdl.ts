import ytdl from 'ytdl-core';

import { RequestHandler, ResponseType } from '@/api/http';

export const YtdlHandler: RequestHandler = {
  PART: 'HTTP',

  async handle<T>(data: T): Promise<ResponseType> {
    const { videoId } = data as { videoId?: string };

    if (!videoId) {
      return { success: false, code: 400, message: '缺少 videoId 參數' };
    }

    try {
      const info = await ytdl.getBasicInfo(`https://www.youtube.com/watch?v=${videoId}`);
      return { success: true, code: 200, message: 'OK', data: info.videoDetails };
    } catch (error: any) {
      return { success: false, code: 500, message: '無法獲取影片資訊' };
    }
  },
};
