import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAlbumModalComponent } from './edit-album-modal.component';

describe('EditAlbumModalComponent', () => {
  let component: EditAlbumModalComponent;
  let fixture: ComponentFixture<EditAlbumModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAlbumModalComponent]
    });
    fixture = TestBed.createComponent(EditAlbumModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
