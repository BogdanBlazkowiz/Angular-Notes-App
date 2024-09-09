import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigNoteComponent } from './big-note.component';

describe('BigNoteComponent', () => {
  let component: BigNoteComponent;
  let fixture: ComponentFixture<BigNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BigNoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BigNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
