import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Query,
  ForbiddenException,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import 'multer';

import { StorageService } from './storage.service';
import {
  CreateLibraryFilePolicyHandler,
  ReadUserPolicyHandler,
  UpdateLibraryFilePolicyHandler,
  UpdateUserPolicyHandler,
} from '@simpler/authorization/core';
import {
  CaslAbility,
  CaslGuard,
  CaslPolicy,
} from '@simpler/authorization/backend';
import {
  MAX_LIBRARY_FILE_COVER_SIZE,
  MAX_LIBRARY_FILE_UPLOAD_SIZE,
  MAX_USER_AVATAR_SIZE,
} from '@simpler-constants';
import { AppAbility } from '@simpler/authorization/core';
import { LibraryFile } from '@prisma/client';
import { ParseArgs } from '@simpler/utils/backend';

@UseGuards(CaslGuard)
@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @CaslPolicy(CreateLibraryFilePolicyHandler())
  @Post('library-file')
  @UseInterceptors(FileInterceptor('file'))
  uploadLibraryFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'wav' }),
          new MaxFileSizeValidator({ maxSize: MAX_LIBRARY_FILE_UPLOAD_SIZE }),
        ],
      })
    )
    file: Express.Multer.File,
    @ParseArgs('libraryFile') libraryFile: Pick<LibraryFile, 'id' | 'userId'>,
    @CaslAbility() ability: AppAbility
  ) {
    const canAccess = CreateLibraryFilePolicyHandler()(ability, libraryFile);

    if (!canAccess) {
      throw new ForbiddenException();
    }

    return this.storageService.uploadLibraryFile(file, libraryFile);
  }

  @CaslPolicy(UpdateLibraryFilePolicyHandler())
  @Post('library-file-cover')
  @UseInterceptors(FileInterceptor('file'))
  uploadLibraryFileCover(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'jpeg' }),
          new MaxFileSizeValidator({ maxSize: MAX_LIBRARY_FILE_COVER_SIZE }),
        ],
      })
    )
    file: Express.Multer.File,
    @ParseArgs('libraryFile') libraryFile: Pick<LibraryFile, 'id' | 'userId'>,
    @CaslAbility() ability: AppAbility
  ) {
    const canAccess = UpdateLibraryFilePolicyHandler()(ability, libraryFile);

    if (!canAccess) {
      throw new ForbiddenException();
    }

    return this.storageService.uploadLibraryFileCover(file, libraryFile);
  }

  @CaslPolicy(UpdateUserPolicyHandler())
  @Post('user-avatar')
  @UseInterceptors(FileInterceptor('file'))
  uploadUserAvatarFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'jpeg' }),
          new MaxFileSizeValidator({ maxSize: MAX_USER_AVATAR_SIZE }),
        ],
      })
    )
    file: Express.Multer.File,
    @Query('userId') userId: string,
    @CaslAbility() ability: AppAbility
  ) {
    const canAccess = UpdateUserPolicyHandler()(ability, { id: userId });

    if (!canAccess) {
      throw new ForbiddenException();
    }

    return this.storageService.uploadUserAvatarFile(file, userId);
  }

  @Get('signed-url')
  findSignedUrl(@Query('url') url: string) {
    return this.storageService.getSignedUrl(decodeURIComponent(url));
  }

  @CaslPolicy(ReadUserPolicyHandler())
  @Get('user-storage-size')
  findUserStorageSize(
    @Query('userId') userId: string,
    @CaslAbility() ability: AppAbility
  ) {
    const canAccess = ReadUserPolicyHandler()(ability, { id: userId });

    if (!canAccess) {
      throw new ForbiddenException();
    }

    return this.storageService.findUserStorageSize(userId);
  }
}
