import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthorizationModule } from '@simpler/authorization/backend';

@Module({
  controllers: [UsersController],
  imports: [AuthorizationModule, ConfigModule],
  providers: [UsersService],
})
export class UsersModule {}
