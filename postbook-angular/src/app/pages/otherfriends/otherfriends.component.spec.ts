import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherfriendsComponent } from './otherfriends.component';

describe('OtherfriendsComponent', () => {
  let component: OtherfriendsComponent;
  let fixture: ComponentFixture<OtherfriendsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtherfriendsComponent]
    });
    fixture = TestBed.createComponent(OtherfriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
