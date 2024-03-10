import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LibraryFile } from '@prisma/client';
import { ApiService } from '@simpler/api';
import { Prisma } from '@prisma/client';

@Injectable({
  providedIn: 'root',
})
export class LibraryFilesService extends ApiService<
  LibraryFile,
  Prisma.LibraryFileFindManyArgs
> {
  protected readonly resource = 'library-files';
  constructor(protected readonly httpClient: HttpClient) {
    super();
  }
}
