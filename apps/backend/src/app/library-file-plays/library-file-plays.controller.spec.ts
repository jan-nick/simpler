import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../core/prisma/prisma.service';
import { LibraryFilePlaysController } from './library-file-plays.controller';
import { LibraryFilePlaysService } from './library-file-plays.service';
import { AuthorizationModule } from '@simpler/authorization/backend';
import { StorageService } from '../storage/storage.service';

describe('LibraryFilePlaysController', () => {
  let controller: LibraryFilePlaysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LibraryFilePlaysController],
      imports: [AuthorizationModule],
      providers: [
        ConfigService,
        LibraryFilePlaysService,
        PrismaService,
        StorageService,
      ],
    }).compile();

    controller = module.get<LibraryFilePlaysController>(LibraryFilePlaysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
