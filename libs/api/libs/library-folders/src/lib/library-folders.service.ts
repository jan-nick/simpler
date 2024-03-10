import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LibraryFolder } from '@prisma/client';
import { ApiService } from '@simpler/api';
import { Prisma } from '@prisma/client';

@Injectable({
  providedIn: 'root',
})
export class LibraryFoldersService extends ApiService<
  LibraryFolder,
  Prisma.LibraryFolderFindManyArgs
> {
  protected readonly resource = 'library-folders';
  constructor(protected readonly httpClient: HttpClient) {
    super();
  }

  findAllInPath(id: string) {
    return this.httpClient.get<LibraryFolder[]>(`${this.url}/path/${id}`);
  }
}
