import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LibraryFilePlaysService } from './library-file-plays.service';

describe('LibraryFilePlaysService', () => {
  let service: LibraryFilePlaysService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(LibraryFilePlaysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
