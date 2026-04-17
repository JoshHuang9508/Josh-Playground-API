import ytpl from 'ytpl';

import { RequestHandler, ResponseType } from '@/api/http';

export const YtplHandler: RequestHandler = {
  PART: 'HTTP',

  async handle<T>(data: T): Promise<ResponseType> {
    const { playlistId } = data as { playlistId?: string };

    if (!playlistId) {
      return { success: false, code: 400, message: '缺少 playlistId 參數' };
    }

    try {
      const info = await ytpl(`https://www.youtube.com/playlist?list=${playlistId}`);
      if (info.items.length === 0) {
        return { success: false, code: 400, message: '無法獲取播放清單' };
      }
      return { success: true, code: 200, message: 'OK', data: info.items };
    } catch (error: any) {
      return { success: false, code: 500, message: '無法獲取影片資訊' };
    }
  },
};
