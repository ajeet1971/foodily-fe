import { TestBed } from '@angular/core/testing';

import { GlobalEmmiterServiceService } from './global-emmiter-service.service';

describe('GlobalEmmiterServiceService', () => {
  let service: GlobalEmmiterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalEmmiterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
