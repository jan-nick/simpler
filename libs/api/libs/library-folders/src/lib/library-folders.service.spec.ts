import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LibraryFoldersService } from './library-folders.service';

describe('LibraryFoldersService', () => {
  let service: LibraryFoldersService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(LibraryFoldersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
