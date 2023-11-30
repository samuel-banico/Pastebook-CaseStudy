import { TestBed } from '@angular/core/testing';

import { NavbarcountService } from './navbarcount.service';

describe('NavbarcountService', () => {
  let service: NavbarcountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavbarcountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
