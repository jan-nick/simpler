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
import { LibraryFoldersService } from './library-folders.service';
import { CreateLibraryFolderDto } from './dto/create-library-folder.dto';
import { UpdateLibraryFolderDto } from './dto/update-library-folder.dto';
import { ParseArgs } from '@simpler/utils/backend';
import {
  CaslAbility,
  CaslGuard,
  CaslPolicy,
} from '@simpler/authorization/backend';
import {
  AppAbility,
  CreateLibraryFolderPolicyHandler,
  DeleteLibraryFolderPolicyHandler,
  ReadLibraryFolderPolicyHandler,
  UpdateLibraryFolderPolicyHandler,
} from '@simpler/authorization/core';

@UseGuards(CaslGuard)
@Controller('library-folders')
export class LibraryFoldersController {
  constructor(private readonly libraryFoldersService: LibraryFoldersService) {}

  @CaslPolicy(CreateLibraryFolderPolicyHandler())
  @Post()
  create(
    @Body() createLibraryFolderDto: CreateLibraryFolderDto,
    @CaslAbility() ability: AppAbility
  ) {
    const canAccess = CreateLibraryFolderPolicyHandler()(
      ability,
      createLibraryFolderDto
    );

    if (!canAccess) {
      throw new ForbiddenException();
    }

    return this.libraryFoldersService.create(createLibraryFolderDto);
  }

  @CaslPolicy(ReadLibraryFolderPolicyHandler())
  @Get()
  async findAll(
    @ParseArgs() args: Prisma.LibraryFolderFindManyArgs,
    @CaslAbility() ability: AppAbility
  ) {
    const libraryFolders = await this.libraryFoldersService.findAll(args);

    libraryFolders.forEach((libraryFolder) => {
      const canAccess = ReadLibraryFolderPolicyHandler()(
        ability,
        libraryFolder
      );

      if (!canAccess) {
        throw new ForbiddenException();
      }
    });

    return libraryFolders;
  }

  @CaslPolicy(ReadLibraryFolderPolicyHandler())
  @Get(':id')
  async findOne(@Param('id') id: string, @CaslAbility() ability: AppAbility) {
    const libraryFolder = await this.libraryFoldersService.findOne(id);

    const canAccess = ReadLibraryFolderPolicyHandler()(ability, libraryFolder);

    if (!canAccess) {
      throw new ForbiddenException();
    }

    return libraryFolder;
  }

  @CaslPolicy(ReadLibraryFolderPolicyHandler())
  @Get('path/:id')
  async findAllInPath(
    @Param('id') id: string,
    @CaslAbility() ability: AppAbility
  ) {
    const libraryFolder = await this.libraryFoldersService.findOne(id);

    const canAccess = UpdateLibraryFolderPolicyHandler()(
      ability,
      libraryFolder
    );

    if (!canAccess) {
      throw new ForbiddenException();
    }

    return this.libraryFoldersService.findAllInPath(id);
  }

  @CaslPolicy(UpdateLibraryFolderPolicyHandler())
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLibraryFolderDto: UpdateLibraryFolderDto,
    @CaslAbility() ability: AppAbility
  ) {
    const libraryFolder = await this.libraryFoldersService.findOne(id);

    const canAccess = UpdateLibraryFolderPolicyHandler()(
      ability,
      libraryFolder
    );

    if (!canAccess) {
      throw new ForbiddenException();
    }

    return this.libraryFoldersService.update(id, updateLibraryFolderDto);
  }

  @CaslPolicy(DeleteLibraryFolderPolicyHandler())
  @Delete(':id')
  async remove(@Param('id') id: string, @CaslAbility() ability: AppAbility) {
    const libraryFolder = await this.libraryFoldersService.findOne(id);

    const canAccess = DeleteLibraryFolderPolicyHandler()(
      ability,
      libraryFolder
    );

    if (!canAccess) {
      throw new ForbiddenException();
    }

    return this.libraryFoldersService.remove(id);
  }
}
