import { TestBed } from '@angular/core/testing';

import { MusicDataService } from './music-data.service';

describe('MusicDataService', () => {
  let service: MusicDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
