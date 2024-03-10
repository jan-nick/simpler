import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../core/prisma/prisma.service';
import { LibraryFilePlaysService } from './library-file-plays.service';
import { StorageService } from '../storage/storage.service';

describe('LibraryFilePlaysService', () => {
  let service: LibraryFilePlaysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ConfigService,
        LibraryFilePlaysService,
        PrismaService,
        StorageService,
      ],
    }).compile();

    service = module.get<LibraryFilePlaysService>(LibraryFilePlaysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
