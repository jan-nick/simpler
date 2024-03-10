import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { UsersService } from '../users/users.service';
import { EmailService } from '../core/email/email.service';
import { ConfigModule } from '@nestjs/config';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { UsersModule } from '../users/users.module';
import { AuthorizationModule } from '@simpler/authorization/backend';

@Module({
  controllers: [AuthController],
  imports: [AuthorizationModule, ConfigModule, JwtModule.register({}), PassportModule, UsersModule],
  providers: [
    AccessTokenStrategy,
    AuthService,
    EmailService,
    LocalStrategy,
    RefreshTokenStrategy,
    UsersService,
  ],
})
export class AuthModule {}
