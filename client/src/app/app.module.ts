import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { ReversePipe } from './reverse.pipe';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { AuthModule } from './auth/auth.module';
import {StoreModule} from '@ngrx/store'
import {EffectsModule} from '@ngrx/effects'
import { appReducer } from './store';
import { AuthEffects } from './auth/store/auth.effects';
import { StoreDevtoolsModule} from '@ngrx/store-devtools'
import { environment } from 'src/environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ReversePipe,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    ShoppingListModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot(appReducer),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({logOnly: !environment.production}),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
