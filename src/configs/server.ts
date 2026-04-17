const parseAllowedOrigins = (raw: string | undefined): string[] | '*' => {
  if (!raw || raw.trim() === '' || raw.trim() === '*') return '*';
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
};

export const serverConfig = {
  port: 4000,
  allowedOrigins: parseAllowedOrigins(process.env.ALLOWED_ORIGINS),
};
