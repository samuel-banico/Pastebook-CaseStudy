import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherpostmodalComponent } from './otherpostmodal.component';

describe('OtherpostmodalComponent', () => {
  let component: OtherpostmodalComponent;
  let fixture: ComponentFixture<OtherpostmodalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtherpostmodalComponent]
    });
    fixture = TestBed.createComponent(OtherpostmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
