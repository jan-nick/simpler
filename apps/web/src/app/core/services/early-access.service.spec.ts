import { TestBed } from '@angular/core/testing';

import { EarlyAccessService } from './early-access.service';

describe('EarlyAccessService', () => {
  let service: EarlyAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EarlyAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
