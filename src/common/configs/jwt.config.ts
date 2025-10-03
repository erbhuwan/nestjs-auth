import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig = registerAs(
  'jwt',
  (): JwtModuleOptions => ({
    secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
    signOptions: {
      expiresIn: process.env.JWT_EXPIRES_IN || '15m',
    },
  }),
);

export const jwtRefreshConfig = registerAs(
  'jwtRefresh',
  () => ({
    secret: process.env.JWT_REFRESH_SECRET || 'your-super-secret-refresh-key-change-in-production',
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  }),
);

export const bcryptConfig = registerAs(
  'bcrypt',
  () => ({
    rounds: parseInt(process.env.BCRYPT_ROUNDS || '12', 10),
  }),
);
