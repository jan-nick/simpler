import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LibraryFilesService } from './library-files.service';

describe('LibraryFilesService', () => {
  let service: LibraryFilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(LibraryFilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
