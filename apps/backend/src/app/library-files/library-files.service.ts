import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/prisma/prisma.service';
import { CreateLibraryFileDto } from './dto/create-library-file.dto';
import { UpdateLibraryFileDto } from './dto/update-library-file.dto';
import { LibraryFile, Prisma } from '@prisma/client';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class LibraryFilesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storageService: StorageService
  ) {}

  create(createLibraryFileDto: CreateLibraryFileDto) {
    return this.prisma.libraryFile.create({ data: createLibraryFileDto });
  }

  findAll(args: Prisma.LibraryFileFindManyArgs) {
    return this.prisma.libraryFile.findMany(args);
  }

  findOne(id: string) {
    return this.prisma.libraryFile.findUnique({
      where: { id },
    });
  }

  update(
    { id, coverUrl }: LibraryFile,
    updateLibraryFileDto: UpdateLibraryFileDto
  ) {
    if (coverUrl && coverUrl !== updateLibraryFileDto.coverUrl) {
      this.storageService.deleteFile(coverUrl);
    }

    return this.prisma.libraryFile.update({
      where: { id },
      data: updateLibraryFileDto,
    });
  }

  async remove({ id, coverUrl, url }: LibraryFile) {
    const libraryFile = await this.prisma.libraryFile.delete({
      where: { id },
    });

    if (coverUrl) {
      await this.storageService.deleteFile(coverUrl);
    }

    if (url) {
      await this.storageService.deleteFile(url);
    }

    return libraryFile;
  }
}
