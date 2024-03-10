import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/prisma/prisma.service';
import { CreateLibraryFilePlayDto } from './dto/create-library-file-play.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class LibraryFilePlaysService {
  constructor(private readonly prisma: PrismaService) {}

  create(createLibraryFilePlayDto: CreateLibraryFilePlayDto) {
    return this.prisma.libraryFilePlay.create({ data: createLibraryFilePlayDto });
  }

  findAll(args: Prisma.LibraryFilePlayFindManyArgs) {
    return this.prisma.libraryFilePlay.findMany(args);
  }

  findOne(id: string) {
    return this.prisma.libraryFilePlay.findUnique({
      where: { id },
    });
  }
}
