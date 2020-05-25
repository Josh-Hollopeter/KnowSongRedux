import { TestBed } from '@angular/core/testing';

import { AudioCreatorService } from './audio-creator.service';

describe('AudioCreatorService', () => {
  let service: AudioCreatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudioCreatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
