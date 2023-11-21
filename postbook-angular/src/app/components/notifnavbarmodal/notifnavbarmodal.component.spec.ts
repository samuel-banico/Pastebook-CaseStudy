import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifnavbarmodalComponent } from './notifnavbarmodal.component';

describe('NotifnavbarmodalComponent', () => {
  let component: NotifnavbarmodalComponent;
  let fixture: ComponentFixture<NotifnavbarmodalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotifnavbarmodalComponent]
    });
    fixture = TestBed.createComponent(NotifnavbarmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
