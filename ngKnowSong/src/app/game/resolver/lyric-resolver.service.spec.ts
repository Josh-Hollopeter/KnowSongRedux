import { TestBed } from '@angular/core/testing';

import { LyricResolverService } from './lyric-resolver.service';

describe('LyricResolverService', () => {
  let service: LyricResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LyricResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
