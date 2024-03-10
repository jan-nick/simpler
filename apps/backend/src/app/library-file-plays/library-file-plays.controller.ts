import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { LibraryFilePlaysService } from './library-file-plays.service';
import { CreateLibraryFilePlayDto } from './dto/create-library-file-play.dto';
import { ParseArgs } from '@simpler/utils/backend';
import {
  CaslAbility,
  CaslGuard,
  CaslPolicy,
} from '@simpler/authorization/backend';
import {
  AppAbility,
  CreateLibraryFilePlayPolicyHandler,
  ReadLibraryFilePlayPolicyHandler,
} from '@simpler/authorization/core';

@UseGuards(CaslGuard)
@Controller('library-file-plays')
export class LibraryFilePlaysController {
  constructor(
    private readonly libraryFilePlaysService: LibraryFilePlaysService
  ) {}

  @CaslPolicy(CreateLibraryFilePlayPolicyHandler())
  @Post()
  create(
    @Body() createLibraryFilePlayDto: CreateLibraryFilePlayDto,
    @CaslAbility() ability: AppAbility
  ) {
    const canAccess = CreateLibraryFilePlayPolicyHandler()(
      ability,
      createLibraryFilePlayDto
    );

    if (!canAccess) {
      throw new ForbiddenException();
    }

    return this.libraryFilePlaysService.create(createLibraryFilePlayDto);
  }

  @CaslPolicy(ReadLibraryFilePlayPolicyHandler())
  @Get()
  async findAll(
    @ParseArgs() args: Prisma.LibraryFilePlayFindManyArgs,
    @CaslAbility() ability: AppAbility
  ) {
    const libraryFiles = await this.libraryFilePlaysService.findAll(args);

    libraryFiles.forEach((libraryFile) => {
      const canAccess = ReadLibraryFilePlayPolicyHandler()(
        ability,
        libraryFile
      );

      if (!canAccess) {
        throw new ForbiddenException();
      }
    });

    return libraryFiles;
  }

  @CaslPolicy(ReadLibraryFilePlayPolicyHandler())
  @Get(':id')
  async findOne(@Param('id') id: string, @CaslAbility() ability: AppAbility) {
    const libraryFile = await this.libraryFilePlaysService.findOne(id);

    const canAccess = ReadLibraryFilePlayPolicyHandler()(ability, libraryFile);

    if (!canAccess) {
      throw new ForbiddenException();
    }

    return libraryFile;
  }
}
