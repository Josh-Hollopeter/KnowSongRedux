import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LyricMatcherComponent } from './lyric-matcher.component';

describe('LyricMatcherComponent', () => {
  let component: LyricMatcherComponent;
  let fixture: ComponentFixture<LyricMatcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LyricMatcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LyricMatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
