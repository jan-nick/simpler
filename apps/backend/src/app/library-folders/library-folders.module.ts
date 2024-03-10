import { Module } from '@nestjs/common';
import { LibraryFoldersService } from './library-folders.service';
import { LibraryFoldersController } from './library-folders.controller';
import { AuthorizationModule } from '@simpler/authorization/backend';

@Module({
  controllers: [LibraryFoldersController],
  imports: [AuthorizationModule],
  providers: [LibraryFoldersService],
})
export class LibraryFoldersModule {}
