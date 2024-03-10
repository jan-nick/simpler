import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@simpler-env';
import { StorageUpload } from '@simpler/types';
import { LibraryFile } from '@prisma/client';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly resource = 'storage';

  protected get url() {
    return `${environment.backendUrl}/${this.resource}`;
  }

  constructor(private readonly httpClient: HttpClient) {}

  uploadLibraryFile(
    file: File,
    libraryFile: Pick<LibraryFile, 'id' | 'userId'>
  ) {
    const formData = new FormData();
    formData.set('file', file);
    return this.httpClient.post<StorageUpload>(
      `${this.url}/library-file`,
      formData,
      {
        params: { libraryFile: JSON.stringify(libraryFile) },
      }
    );
  }

  uploadLibraryFileCover(
    file: File,
    libraryFile: Pick<LibraryFile, 'id' | 'userId'>
  ) {
    const formData = new FormData();
    formData.set('file', file);
    return this.httpClient.post<StorageUpload>(
      `${this.url}/library-file-cover`,
      formData,
      {
        params: { libraryFile: JSON.stringify(libraryFile) },
      }
    );
  }

  uploadUserAvatarFile(file: File, userId: string) {
    const formData = new FormData();
    formData.set('file', file);
    return this.httpClient.post<StorageUpload>(
      `${this.url}/user-avatar`,
      formData,
      {
        params: { userId },
      }
    );
  }

  getSignedUrl(storageUrl: string) {
    return this.httpClient.get(`${this.url}/signed-url`, {
      responseType: 'text',
      params: { url: encodeURIComponent(storageUrl) },
    });
  }

  findUserStorageSize(userId: string) {
    return this.httpClient.get<number>(`${this.url}/user-storage-size`, {
      params: { userId },
    });
  }
}
