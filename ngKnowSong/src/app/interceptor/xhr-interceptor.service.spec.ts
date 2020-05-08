import { TestBed } from '@angular/core/testing';

import { XhrInterceptorService } from './xhr-interceptor.service';

describe('XhrInterceptorService', () => {
  let service: XhrInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XhrInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
