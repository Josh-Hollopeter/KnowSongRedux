import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseYearComponent } from './release-year.component';

describe('ReleaseYearComponent', () => {
  let component: ReleaseYearComponent;
  let fixture: ComponentFixture<ReleaseYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
