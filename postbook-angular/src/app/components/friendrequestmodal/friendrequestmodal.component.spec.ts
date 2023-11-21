import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendrequestmodalComponent } from './friendrequestmodal.component';

describe('FriendrequestmodalComponent', () => {
  let component: FriendrequestmodalComponent;
  let fixture: ComponentFixture<FriendrequestmodalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FriendrequestmodalComponent]
    });
    fixture = TestBed.createComponent(FriendrequestmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
