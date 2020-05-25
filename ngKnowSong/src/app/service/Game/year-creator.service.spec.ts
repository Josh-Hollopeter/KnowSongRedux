import { TestBed } from '@angular/core/testing';

import { YearCreatorService } from './year-creator.service';

describe('YearCreatorService', () => {
  let service: YearCreatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YearCreatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
