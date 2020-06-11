import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LyricMatcherComponent } from './lyric-matcher.component';

import { AppRoutingModule } from './../../app-routing.module';

import { HttpClientModule } from '@angular/common/http';


describe('LyricMatcherComponent', () => {
  let component: LyricMatcherComponent;
  let fixture: ComponentFixture<LyricMatcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LyricMatcherComponent ],
      imports:[ HttpClientModule,AppRoutingModule]
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
