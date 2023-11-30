import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OthersinglealbumComponent } from './othersinglealbum.component';

describe('OthersinglealbumComponent', () => {
  let component: OthersinglealbumComponent;
  let fixture: ComponentFixture<OthersinglealbumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OthersinglealbumComponent]
    });
    fixture = TestBed.createComponent(OthersinglealbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
