import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { fromApp, AppEffects } from './shared/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenRefreshService } from './shared/services/token-refresh.service';
import { TokenAuthorizationService } from './shared/services/token-authorization.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot(AppEffects),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenAuthorizationService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenRefreshService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
