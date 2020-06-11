import { TestBed } from '@angular/core/testing';

import { MusixMatchService } from './musix-match.service';

describe('MusixMatchService', () => {
  let service: MusixMatchService = new MusixMatchService(undefined);

  // beforeEach(() => {
  //   TestBed.configureTestingModule({});
  //   service = TestBed.inject(MusixMatchService);
  // });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
