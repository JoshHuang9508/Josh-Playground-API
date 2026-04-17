export const osuConfig = {
  clientId: process.env.OSU_CLIENT_ID || '',
  clientSecret: process.env.OSU_CLIENT_SECRET || '',
  defaultUser: process.env.OSU_DEFAULT_USER || '',
  apiBaseUrl: 'https://osu.ppy.sh/api/v2',
  tokenUrl: 'https://osu.ppy.sh/oauth/token',
};
