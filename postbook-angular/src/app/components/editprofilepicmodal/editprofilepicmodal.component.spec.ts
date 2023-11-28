import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditprofilepicmodalComponent } from './editprofilepicmodal.component';

describe('EditprofilepicmodalComponent', () => {
  let component: EditprofilepicmodalComponent;
  let fixture: ComponentFixture<EditprofilepicmodalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditprofilepicmodalComponent]
    });
    fixture = TestBed.createComponent(EditprofilepicmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
