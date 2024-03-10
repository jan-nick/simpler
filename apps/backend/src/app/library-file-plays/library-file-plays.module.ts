import { Module } from '@nestjs/common';
import { LibraryFilePlaysService } from './library-file-plays.service';
import { LibraryFilePlaysController } from './library-file-plays.controller';
import { AuthorizationModule } from '@simpler/authorization/backend';
import { StorageService } from '../storage/storage.service';
import { StorageModule } from '../storage/storage.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [LibraryFilePlaysController],
  imports: [AuthorizationModule, ConfigModule, StorageModule],
  providers: [LibraryFilePlaysService, StorageService],
})
export class LibraryFilePlaysModule {}
