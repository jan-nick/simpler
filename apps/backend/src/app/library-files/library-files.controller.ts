import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { LibraryFilesService } from './library-files.service';
import { CreateLibraryFileDto } from './dto/create-library-file.dto';
import { UpdateLibraryFileDto } from './dto/update-library-file.dto';
import { ParseArgs } from '@simpler/utils/backend';
import {
  CaslAbility,
  CaslGuard,
  CaslPolicy,
} from '@simpler/authorization/backend';
import {
  AppAbility,
  CreateLibraryFilePolicyHandler,
  DeleteLibraryFilePolicyHandler,
  ReadLibraryFilePolicyHandler,
  UpdateLibraryFilePolicyHandler,
} from '@simpler/authorization/core';

@UseGuards(CaslGuard)
@Controller('library-files')
export class LibraryFilesController {
  constructor(private readonly libraryFilesService: LibraryFilesService) {}

  @CaslPolicy(CreateLibraryFilePolicyHandler())
  @Post()
  create(
    @Body() createLibraryFileDto: CreateLibraryFileDto,
    @CaslAbility() ability: AppAbility
  ) {
    const canAccess = CreateLibraryFilePolicyHandler()(
      ability,
      createLibraryFileDto
    );

    if (!canAccess) {
      throw new ForbiddenException();
    }

    return this.libraryFilesService.create(createLibraryFileDto);
  }

  @CaslPolicy(ReadLibraryFilePolicyHandler())
  @Get()
  async findAll(
    @ParseArgs() args: Prisma.LibraryFileFindManyArgs,
    @CaslAbility() ability: AppAbility
  ) {
    const libraryFiles = await this.libraryFilesService.findAll(args);

    libraryFiles.forEach((libraryFile) => {
      const canAccess = ReadLibraryFilePolicyHandler()(ability, libraryFile);

      if (!canAccess) {
        throw new ForbiddenException();
      }
    });

    return libraryFiles;
  }

  @CaslPolicy(ReadLibraryFilePolicyHandler())
  @Get(':id')
  async findOne(@Param('id') id: string, @CaslAbility() ability: AppAbility) {
    const libraryFile = await this.libraryFilesService.findOne(id);

    const canAccess = ReadLibraryFilePolicyHandler()(ability, libraryFile);

    if (!canAccess) {
      throw new ForbiddenException();
    }

    return libraryFile;
  }

  @CaslPolicy(UpdateLibraryFilePolicyHandler())
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLibraryFileDto: UpdateLibraryFileDto,
    @CaslAbility() ability: AppAbility
  ) {
    const libraryFile = await this.libraryFilesService.findOne(id);

    const canAccess = UpdateLibraryFilePolicyHandler()(ability, libraryFile);

    if (!canAccess) {
      throw new ForbiddenException();
    }

    return this.libraryFilesService.update(libraryFile, updateLibraryFileDto);
  }

  @CaslPolicy(DeleteLibraryFilePolicyHandler())
  @Delete(':id')
  async remove(@Param('id') id: string, @CaslAbility() ability: AppAbility) {
    const libraryFile = await this.libraryFilesService.findOne(id);

    const canAccess = DeleteLibraryFilePolicyHandler()(ability, libraryFile);

    if (!canAccess) {
      throw new ForbiddenException();
    }

    return this.libraryFilesService.remove(libraryFile);
  }
}
