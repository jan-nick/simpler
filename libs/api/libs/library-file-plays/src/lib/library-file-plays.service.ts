import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LibraryFilePlay, Prisma } from '@prisma/client';
import { environment } from '@simpler-env';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LibraryFilePlaysService {
  private readonly resource = 'library-file-plays';
  constructor(private readonly httpClient: HttpClient) {}

  private get url() {
    return `${environment.backendUrl}/${this.resource}`;
  }

  findOne(id: string) {
    return this.httpClient.get<LibraryFilePlay>(`${this.url}/${id}`);
  }

  findAll(args?: Prisma.LibraryFilePlayFindManyArgs) {
    let params = new HttpParams();

    if (args) {
      params = params.set('args', JSON.stringify(args));
    }

    return this.httpClient.get<LibraryFilePlay[]>(`${this.url}`, { params });
  }

  create(data: Pick<LibraryFilePlay, 'libraryFileId' | 'userId'>) {
    return firstValueFrom(this.httpClient.post<LibraryFilePlay>(`${this.url}`, data));
  }
}
