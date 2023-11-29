import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglephotomodalComponent } from './singlephotomodal.component';

describe('SinglephotomodalComponent', () => {
  let component: SinglephotomodalComponent;
  let fixture: ComponentFixture<SinglephotomodalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SinglephotomodalComponent]
    });
    fixture = TestBed.createComponent(SinglephotomodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
