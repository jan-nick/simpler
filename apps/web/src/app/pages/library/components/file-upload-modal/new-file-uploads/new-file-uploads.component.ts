import { Component } from '@angular/core';
import { StorageService } from '@simpler/api/storage';
import { AnimationDuration } from '@simpler/types';
import { sum } from '@simpler/utils';
import {
  MAX_LIBRARY_FILE_UPLOAD_SIZE,
  MAX_LIBRARY_SIZE,
} from '@simpler-constants';
import { fadeOutOnLeaveAnimation } from 'angular-animations';
import { firstValueFrom } from 'rxjs';
import { UploadErrors } from '../../../models/types/upload-errors.type';
import { LibraryFilesService } from '../../../pages/library-files/library-files.service';
import { LibraryUploadService } from '../../../services/library-upload.service';

@Component({
  selector: 'simpler-new-file-uploads',
  templateUrl: './new-file-uploads.component.html',
  styleUrls: ['./new-file-uploads.component.scss'],
  animations: [fadeOutOnLeaveAnimation({ duration: AnimationDuration.Normal })],
})
export class NewFileUploadsComponent {
  uploadErrors: UploadErrors = {};

  get hasUploadErrors() {
    return Object.values(this.uploadErrors).some((value) => value);
  }

  constructor(
    public readonly libraryUploadService: LibraryUploadService,
    public readonly libraryFilesService: LibraryFilesService,
    private readonly storageService: StorageService
  ) {}

  async onSelectFiles(files: File[] | undefined | null) {
    if (!files?.length) return;

    this.uploadErrors = await this.checkForUploadErrors(files);

    if (this.hasUploadErrors) return;

    const activeFolderId = await firstValueFrom(
      this.libraryFilesService.activeFolderId$
    );

    this.libraryUploadService.uploadFiles(files, activeFolderId ?? null);
  }

  async checkForUploadErrors(files: File[]): Promise<UploadErrors> {
    // TODO
    // ! Possible code smell
    // ! could falsely allow user to exceed max storage
    // ! when adding uploads while other uploads are running
    // * possible fix: check if storage value is incremented continually during upload
    // * if not, add loading state here

    const filesExceedingMaxSize = await this.checkForFilesExceedingMaxSize(
      files
    );
    const filesWithWrongFormat = this.checkForFilesWithWrongFormat(files);
    const noStorageLeft = await this.checkForNoStorageLeft(files);
    return {
      filesExceedingMaxSize,
      filesWithWrongFormat,
      noStorageLeft,
    };
  }

  async checkForFilesExceedingMaxSize(files: File[]) {
    const filesExceedingMaxSize = files.filter(
      ({ size }) => size > MAX_LIBRARY_FILE_UPLOAD_SIZE
    );
    return filesExceedingMaxSize.length ? filesExceedingMaxSize : undefined;
  }

  checkForFilesWithWrongFormat(files: File[]) {
    const allowedFileFormats = ['audio/wav', 'audio/mp3'];
    const filesWithWrongFormat = files.filter(
      ({ type }) =>
        !allowedFileFormats.some((fileFormat) => fileFormat === type)
    );
    return filesWithWrongFormat.length ? filesWithWrongFormat : undefined;
  }

  async checkForNoStorageLeft(files: File[]) {
    const totalSize = sum(...files.map(({ size }) => size));
    const userStorage = await firstValueFrom(
      this.libraryUploadService.userStorage$
    );
    return userStorage + totalSize > MAX_LIBRARY_SIZE;
  }
}
