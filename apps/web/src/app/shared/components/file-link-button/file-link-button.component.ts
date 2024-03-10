import { Component, Input } from '@angular/core';
import { LibraryFile } from '@prisma/client';
import { environment } from '@simpler-env';
import { firstValueFrom, timer } from 'rxjs';

@Component({
  selector: 'simpler-file-link-button',
  templateUrl: './file-link-button.component.html',
  styleUrls: ['./file-link-button.component.scss'],
})
export class FileLinkButtonComponent {
  @Input() libraryFile: LibraryFile | null | undefined;

  readonly copySuccessTooltipTime = 3000;
  copySuccessTooltipVisible = false;

  get libraryFileLink() {
    return (
      this.libraryFile &&
      `${environment.frontendUrl}/file/${this.libraryFile.id}`
    );
  }

  async copyLinkToClipboard() {
    if (this.libraryFileLink) {
      navigator.clipboard.writeText(this.libraryFileLink);

      this.copySuccessTooltipVisible = true;
      await firstValueFrom(timer(this.copySuccessTooltipTime));
      this.copySuccessTooltipVisible = false;
    }
  }
}
