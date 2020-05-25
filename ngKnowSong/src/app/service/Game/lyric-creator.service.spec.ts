import { TestBed } from '@angular/core/testing';

import { LyricCreatorService } from './lyric-creator.service';

describe('LyricCreatorService', () => {
  let service: LyricCreatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LyricCreatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
