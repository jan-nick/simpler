import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LibraryFileUtilityService {
  constructor(private readonly httpClient: HttpClient) {}

  downloadFile(signedUrl: string, name = '') {
    return this.httpClient.get(signedUrl, { responseType: 'arraybuffer' }).pipe(
      map((arraybuffer) => {
        const blob = new Blob([arraybuffer]);
        const anchorElement = document.createElement('a');

        anchorElement.hidden = true;
        anchorElement.href = window.URL.createObjectURL(blob);
        anchorElement.download = name;

        anchorElement.click();
        anchorElement.remove();
      })
    );
  }
}
