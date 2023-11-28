import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherwallComponent } from './otherwall.component';

describe('OtherwallComponent', () => {
  let component: OtherwallComponent;
  let fixture: ComponentFixture<OtherwallComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtherwallComponent]
    });
    fixture = TestBed.createComponent(OtherwallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
