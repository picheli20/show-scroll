import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { provideHttpClient } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from './pages/app-routing.module';
import { PageEffects } from './store/effects/page.effects';
import { ShowEffects } from './store/effects/show.effects';
import { pageReducer } from './store/reducers/page.reducer';
import { showReducer } from './store/reducers/show.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    StoreModule.forRoot({
      page: pageReducer,
      show: showReducer,
    }),
    EffectsModule.forRoot([PageEffects, ShowEffects]),
    HeaderComponent,
  ],
  providers: [{
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    },
    provideHttpClient(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
