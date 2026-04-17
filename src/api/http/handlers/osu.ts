import { RequestHandler, ResponseType } from '@/api/http';

import Logger from '@/logger';

import { osuConfig } from '@/configs';

type OsuTokenCache = {
  accessToken: string;
  expiresAt: number;
};

let tokenCache: OsuTokenCache | null = null;

const getAccessToken = async (): Promise<string> => {
  if (tokenCache && tokenCache.expiresAt > Date.now() + 60_000) {
    return tokenCache.accessToken;
  }

  if (!osuConfig.clientId || !osuConfig.clientSecret) {
    throw new Error('缺少 OSU_CLIENT_ID 或 OSU_CLIENT_SECRET');
  }

  const res = await fetch(osuConfig.tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: osuConfig.clientId,
      client_secret: osuConfig.clientSecret,
      grant_type: 'client_credentials',
      scope: 'public',
    }),
  });

  if (!res.ok) {
    throw new Error(`取得 osu! access token 失敗: ${res.status}`);
  }

  const body = (await res.json()) as { access_token: string; expires_in: number };
  tokenCache = {
    accessToken: body.access_token,
    expiresAt: Date.now() + body.expires_in * 1000,
  };
  return tokenCache.accessToken;
};

export interface OsuUserStats {
  username: string;
  avatarUrl: string;
  countryCode: string;
  joinDate: string;
  globalRank: number | null;
  countryRank: number | null;
  pp: number | null;
  level: number;
  levelProgress: number;
  accuracy: number;
  playCount: number;
  playTime: number;
  gradeCounts: {
    ss: number;
    s: number;
    a: number;
  };
}

export const OsuStatsHandler: RequestHandler = {
  PART: 'HTTP',

  async handle<T>(data: T): Promise<ResponseType> {
    const { username: rawUsername, mode: rawMode } = (data || {}) as { username?: string; mode?: string };
    const username = rawUsername || osuConfig.defaultUser;
    const mode = rawMode || 'osu';

    if (!username) {
      return { success: false, code: 400, message: '缺少 username 參數' };
    }

    try {
      const token = await getAccessToken();

      const res = await fetch(`${osuConfig.apiBaseUrl}/users/${encodeURIComponent(username)}/${mode}?key=username`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      if (res.status === 404) {
        return { success: false, code: 404, message: '找不到此玩家' };
      }

      if (!res.ok) {
        return { success: false, code: 502, message: `osu! API 錯誤: ${res.status}` };
      }

      const user = (await res.json()) as any;
      const stats = user.statistics || {};
      const level = stats.level || { current: 0, progress: 0 };
      const grades = stats.grade_counts || {};

      const result: OsuUserStats = {
        username: user.username,
        avatarUrl: user.avatar_url,
        countryCode: user.country_code,
        joinDate: user.join_date,
        globalRank: stats.global_rank ?? null,
        countryRank: stats.country_rank ?? stats.rank?.country ?? null,
        pp: stats.pp ?? null,
        level: level.current ?? 0,
        levelProgress: level.progress ?? 0,
        accuracy: stats.hit_accuracy ?? 0,
        playCount: stats.play_count ?? 0,
        playTime: stats.play_time ?? 0,
        gradeCounts: {
          ss: (grades.ss ?? 0) + (grades.ssh ?? 0),
          s: (grades.s ?? 0) + (grades.sh ?? 0),
          a: grades.a ?? 0,
        },
      };

      return { success: true, code: 200, message: 'OK', data: result };
    } catch (error: any) {
      new Logger('HTTP').error(`OsuStatsHandler 錯誤: ${error.message}`);
      return { success: false, code: 500, message: '無法獲取 osu! 玩家資訊' };
    }
  },
};
