import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllnotifsComponent } from './allnotifs.component';

describe('AllnotifsComponent', () => {
  let component: AllnotifsComponent;
  let fixture: ComponentFixture<AllnotifsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllnotifsComponent]
    });
    fixture = TestBed.createComponent(AllnotifsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
