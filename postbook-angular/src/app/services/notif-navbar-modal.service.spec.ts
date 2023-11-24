import { TestBed } from '@angular/core/testing';

import { NotifNavbarModalService } from './notif-navbar-modal.service';

describe('NotifNavbarModalService', () => {
  let service: NotifNavbarModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotifNavbarModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
