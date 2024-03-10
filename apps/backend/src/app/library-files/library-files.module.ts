import { Module } from '@nestjs/common';
import { LibraryFilesService } from './library-files.service';
import { LibraryFilesController } from './library-files.controller';
import { AuthorizationModule } from '@simpler/authorization/backend';
import { StorageService } from '../storage/storage.service';
import { StorageModule } from '../storage/storage.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [LibraryFilesController],
  imports: [AuthorizationModule, ConfigModule, StorageModule],
  providers: [LibraryFilesService, StorageService],
})
export class LibraryFilesModule {}
