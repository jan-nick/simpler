import { TestBed } from '@angular/core/testing';

import { LibraryFileUtilityService } from './library-file-utility.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LibraryFileUtilityService', () => {
  let service: LibraryFileUtilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(LibraryFileUtilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
