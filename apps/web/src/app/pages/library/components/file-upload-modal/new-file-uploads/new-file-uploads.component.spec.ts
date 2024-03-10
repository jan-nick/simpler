import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { TranslateModule } from '@ngx-translate/core';
import {
  MockComponent,
  MockModule,
  MockProvider,
  MockProviders,
} from 'ng-mocks';
import { fileMockFactory } from '@simpler/testing';
import { UploadErrors } from '../../../models/types/upload-errors.type';
import { LibraryUploadService } from '../../../services/library-upload.service';
import { UploadAreaComponent } from '../../upload-area/upload-area.component';

import { NewFileUploadsComponent } from './new-file-uploads.component';
import { StorageService } from '@simpler/api/storage';
import { of } from 'rxjs';
import { LibraryFilesService } from '../../../pages/library-files/library-files.service';
import {
  MAX_LIBRARY_FILE_UPLOAD_SIZE,
  MAX_LIBRARY_SIZE,
} from '@simpler-constants';

describe('NewFileUploadsComponent', () => {
  const activeFolderId = 'active-folder-id';

  let spectator: Spectator<NewFileUploadsComponent>;

  let mockFiles: File[];

  let libraryFilesService: LibraryFilesService;
  let libraryUploadService: LibraryUploadService;
  let storageService: StorageService;

  const createComponent = createComponentFactory({
    component: NewFileUploadsComponent,
    declarations: [MockComponent(UploadAreaComponent)],
    imports: [MockModule(TranslateModule)],
    providers: [
      MockProviders(LibraryUploadService, StorageService),
      MockProvider(LibraryFilesService, {
        activeFolderId$: of(activeFolderId),
      }),
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    mockFiles = [fileMockFactory()];
    libraryFilesService = spectator.inject(LibraryFilesService);
    libraryUploadService = spectator.inject(LibraryUploadService);
    storageService = spectator.inject(StorageService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('hasUploadErrors', () => {
    it('should return true if any upload error is truthy', () => {
      spectator.component.uploadErrors = {};
      expect(spectator.component.hasUploadErrors).toBe(false);

      spectator.component.uploadErrors = {
        noStorageLeft: false,
        filesExceedingMaxSize: undefined,
      };
      expect(spectator.component.hasUploadErrors).toBe(false);

      spectator.component.uploadErrors = {
        noStorageLeft: false,
        filesExceedingMaxSize: mockFiles,
      };
      expect(spectator.component.hasUploadErrors).toBe(true);
    });
  });

  describe('onSelectFiles', () => {
    it('should check files for upload errors', async () => {
      const uploadErrors = { noStorageLeft: true };
      const spy = jest
        .spyOn(spectator.component, 'checkForUploadErrors')
        .mockResolvedValue(uploadErrors);

      await spectator.component.onSelectFiles(mockFiles);

      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(mockFiles);
      expect(spectator.component.uploadErrors).toStrictEqual(uploadErrors);
    });

    it('should upload files if files produce no upload errors', async () => {
      const spy = jest.spyOn(libraryUploadService, 'uploadFiles');
      jest
        .spyOn(spectator.component, 'checkForUploadErrors')
        .mockResolvedValue({});

      await spectator.component.onSelectFiles(mockFiles);

      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(mockFiles, activeFolderId);
    });
  });

  describe('checkForUploadErrors', () => {
    let noUploadErrors: UploadErrors;

    beforeEach(() => {
      noUploadErrors = {
        filesExceedingMaxSize: undefined,
        filesWithWrongFormat: undefined,
        noStorageLeft: undefined,
      };

      spectator.component.checkForFilesExceedingMaxSize = jest.fn();
      spectator.component.checkForFilesWithWrongFormat = jest.fn();
      spectator.component.checkForNoStorageLeft = jest.fn();
    });

    it('should check files for that exceed the maximum upload size', async () => {
      const spy = jest
        .spyOn(spectator.component, 'checkForFilesExceedingMaxSize')
        .mockResolvedValueOnce(undefined)
        .mockResolvedValueOnce(mockFiles);

      let result = await spectator.component.checkForUploadErrors(mockFiles);

      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(mockFiles);
      expect(result).toStrictEqual(noUploadErrors);

      result = await spectator.component.checkForUploadErrors(mockFiles);

      expect(spy).toBeCalledTimes(2);
      expect(spy).toBeCalledWith(mockFiles);
      expect(result).toStrictEqual({
        ...noUploadErrors,
        filesExceedingMaxSize: mockFiles,
      });
    });

    it('should check files with a wrong file format', async () => {
      const spy = jest
        .spyOn(spectator.component, 'checkForFilesWithWrongFormat')
        .mockReturnValueOnce(undefined)
        .mockReturnValueOnce(mockFiles);

      let result = await spectator.component.checkForUploadErrors(mockFiles);

      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(mockFiles);
      expect(result).toStrictEqual(noUploadErrors);

      result = await spectator.component.checkForUploadErrors(mockFiles);

      expect(spy).toBeCalledTimes(2);
      expect(spy).toBeCalledWith(mockFiles);
      expect(result).toStrictEqual({
        ...noUploadErrors,
        filesWithWrongFormat: mockFiles,
      });
    });

    it('should check whether sum of all file sizes exceeds storage user has left', async () => {
      const spy = jest
        .spyOn(spectator.component, 'checkForNoStorageLeft')
        .mockResolvedValueOnce(false)
        .mockResolvedValueOnce(true);

      let result = await spectator.component.checkForUploadErrors(mockFiles);

      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(mockFiles);
      expect(result).toStrictEqual({
        ...noUploadErrors,
        noStorageLeft: false,
      });

      result = await spectator.component.checkForUploadErrors(mockFiles);

      expect(spy).toBeCalledTimes(2);
      expect(spy).toBeCalledWith(mockFiles);
      expect(result).toStrictEqual({
        ...noUploadErrors,
        noStorageLeft: true,
      });
    });
  });

  describe('checkForFilesExceedingMaxSize', () => {
    it('should return files with size that exceed the maximum upload size', () => {
      const result = spectator.component.checkForFilesExceedingMaxSize([
        fileMockFactory({
          name: 'file a',
          size: MAX_LIBRARY_FILE_UPLOAD_SIZE - 100,
        }),
        fileMockFactory({
          name: 'file b',
          size: MAX_LIBRARY_FILE_UPLOAD_SIZE + 1500,
        }),
        fileMockFactory({
          name: 'file c',
          size: MAX_LIBRARY_FILE_UPLOAD_SIZE - 500,
        }),
      ]);
      const expected = [
        fileMockFactory({
          name: 'file b',
          size: MAX_LIBRARY_FILE_UPLOAD_SIZE + 1500,
        }),
      ];
      expect(result).resolves.toStrictEqual(expected);
    });
  });

  describe('checkForFilesWithWrongFormat', () => {
    it('should return files with wrong file type', () => {
      const result = spectator.component.checkForFilesWithWrongFormat([
        fileMockFactory({ name: 'file a', type: 'audio/mp3' }),
        fileMockFactory({ name: 'file b', type: 'audio/wav' }),
        fileMockFactory({ name: 'file c', type: 'png' }),
      ]);
      const expected = [fileMockFactory({ name: 'file c', type: 'png' })];
      expect(result).toStrictEqual(expected);
    });
  });

  describe('checkForNoStorageLeft', () => {
    it('should return whether sum of files sizes exceed remaining user storage', () => {
      libraryUploadService.userStorage$ = of(500);

      let result = spectator.component.checkForNoStorageLeft([
        fileMockFactory({ name: 'file a', size: 100 }),
        fileMockFactory({
          name: 'file b',
          size: 300,
        }),
      ]);
      expect(result).resolves.toBe(false);

      result = spectator.component.checkForNoStorageLeft([
        fileMockFactory({ name: 'file a', size: 100 }),
        fileMockFactory({ name: 'file b', size: MAX_LIBRARY_SIZE + 500 }),
      ]);
      expect(result).resolves.toBe(true);
    });
  });
});
