import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddphotomodalComponent } from './addphotomodal.component';

describe('AddphotomodalComponent', () => {
  let component: AddphotomodalComponent;
  let fixture: ComponentFixture<AddphotomodalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddphotomodalComponent]
    });
    fixture = TestBed.createComponent(AddphotomodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
