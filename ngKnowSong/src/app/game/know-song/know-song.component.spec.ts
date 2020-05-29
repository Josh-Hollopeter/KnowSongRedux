import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SpotifyAPIService } from 'src/app/service/API/spotify-api.service';
import { MusixMatchService } from 'src/app/service/API/musix-match.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowSongComponent } from './know-song.component';

import { AppRoutingModule } from './../../app-routing.module';

import { HttpClientModule, HttpXhrBackend } from '@angular/common/http';


describe('KnowSongComponent', () => {
  let component: KnowSongComponent;
  let fixture: ComponentFixture<KnowSongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnowSongComponent ],
      imports: [HttpClientModule,AppRoutingModule],
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
