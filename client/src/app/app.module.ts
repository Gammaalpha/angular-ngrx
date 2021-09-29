import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { ListingComponent } from './components/listing/listing.component';
import { DetailComponent } from './components/detail/detail.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from './material.module';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { filterReducer } from './store/reducers/filter.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CarEffects } from './store/effect/data.effect';
import { dataReducer } from './store/reducers/data.reducer';


@NgModule({
  declarations: [
    AppComponent,
    ListingComponent,
    DetailComponent,
    NavbarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgbModule,
    NgbCarouselModule,
    EffectsModule.forRoot([CarEffects]),
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'detail/:id', component: DetailComponent },
    ]),
    StoreModule.forRoot({ filter: filterReducer, data: dataReducer }),
    // StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
