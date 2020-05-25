import { TestBed } from '@angular/core/testing';

import { YearResolverService } from './year-resolver.service';

describe('YearResolverService', () => {
  let service: YearResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YearResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
