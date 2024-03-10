import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { StorageController } from './storage.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthorizationModule } from '@simpler/authorization/backend';

@Module({
  controllers: [StorageController],
  imports: [AuthorizationModule, ConfigModule],
  providers: [StorageService],
})
export class StorageModule {}
