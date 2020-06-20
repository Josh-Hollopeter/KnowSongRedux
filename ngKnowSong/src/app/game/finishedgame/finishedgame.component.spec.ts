import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedgameComponent } from './finishedgame.component';

describe('FinishedgameComponent', () => {
  let component: FinishedgameComponent;
  let fixture: ComponentFixture<FinishedgameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishedgameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishedgameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
