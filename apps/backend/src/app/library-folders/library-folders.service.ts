import { Injectable } from '@nestjs/common';
import { LibraryFolder, Prisma } from '@prisma/client';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from '../core/prisma/prisma.service';
import { CreateLibraryFolderDto } from './dto/create-library-folder.dto';
import { UpdateLibraryFolderDto } from './dto/update-library-folder.dto';

@Injectable()
export class LibraryFoldersService {
  constructor(private readonly prisma: PrismaService) {}

  create(createLibraryFileDto: CreateLibraryFolderDto) {
    return this.prisma.libraryFolder.create({ data: createLibraryFileDto });
  }

  findAll(args: Prisma.LibraryFolderFindManyArgs) {
    return this.prisma.libraryFolder.findMany(args);
  }

  async findAllInPath(id: string) {
    return this.findOne(id).then(async (libraryFolder) => {
      const libraryFolders: LibraryFolder[] = libraryFolder
        ? [libraryFolder]
        : [];

      while (
        libraryFolder?.parentId // && libraryFolders.length < (limit || libraryFolders.length + 1)
      ) {
        libraryFolder = await this.findOne(libraryFolder.parentId);

        if (libraryFolder) libraryFolders.push(libraryFolder);
      }

      return libraryFolders;
    });
  }

  findOne(id: string) {
    return this.prisma.libraryFolder.findUnique({
      where: { id },
    });
  }

  update(id: string, updateLibraryFolderDto: UpdateLibraryFolderDto) {
    return this.prisma.libraryFolder.update({
      where: { id },
      data: updateLibraryFolderDto,
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
