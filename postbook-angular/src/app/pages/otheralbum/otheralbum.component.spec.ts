import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtheralbumComponent } from './otheralbum.component';

describe('OtheralbumComponent', () => {
  let component: OtheralbumComponent;
  let fixture: ComponentFixture<OtheralbumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtheralbumComponent]
    });
    fixture = TestBed.createComponent(OtheralbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
