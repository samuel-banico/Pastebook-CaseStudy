import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatealbummodalComponent } from './createalbummodal.component';

describe('CreatealbummodalComponent', () => {
  let component: CreatealbummodalComponent;
  let fixture: ComponentFixture<CreatealbummodalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatealbummodalComponent]
    });
    fixture = TestBed.createComponent(CreatealbummodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
