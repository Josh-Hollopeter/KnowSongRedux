import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LyricMatchComponent } from './lyric-match.component';

describe('LyricMatchComponent', () => {
  let component: LyricMatchComponent;
  let fixture: ComponentFixture<LyricMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LyricMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LyricMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
