import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowSongComponent } from './know-song.component';

describe('KnowSongComponent', () => {
  let component: KnowSongComponent;
  let fixture: ComponentFixture<KnowSongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnowSongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
