import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostlikelistComponent } from './postlikelist.component';

describe('PostlikelistComponent', () => {
  let component: PostlikelistComponent;
  let fixture: ComponentFixture<PostlikelistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostlikelistComponent]
    });
    fixture = TestBed.createComponent(PostlikelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
