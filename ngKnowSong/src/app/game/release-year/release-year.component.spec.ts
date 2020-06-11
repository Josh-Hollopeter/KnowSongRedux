import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseYearComponent } from './release-year.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('ReleaseYearComponent', () => {
  let component: ReleaseYearComponent;
  let fixture: ComponentFixture<ReleaseYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseYearComponent ],
      imports:[ HttpClientModule,AppRoutingModule]
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
