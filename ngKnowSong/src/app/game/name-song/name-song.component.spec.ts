import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameSongComponent } from './name-song.component';

describe('NameSongComponent', () => {
  let component: NameSongComponent;
  let fixture: ComponentFixture<NameSongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameSongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
