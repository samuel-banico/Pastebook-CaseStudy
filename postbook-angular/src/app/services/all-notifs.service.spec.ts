import { TestBed } from '@angular/core/testing';

import { AllNotifsService } from './all-notifs.service';

describe('AllNotifsService', () => {
  let service: AllNotifsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllNotifsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
