import { TestBed } from '@angular/core/testing';

import { SongstreamService } from './songstream.service';

describe('SongstreamService', () => {
  let service: SongstreamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SongstreamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
