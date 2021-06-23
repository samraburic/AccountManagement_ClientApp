import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';

import localeIt from '@angular/common/locales/it';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from './layout/layout.module';
import { MaterialDesignModule } from './shared/material-design/material-design.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SnackBarComponent } from './snackbar.component';
import { registerLocaleData } from '@angular/common';
import { LoginComponent } from './login';
import { JwtInterceptor, JwtModule } from '@auth0/angular-jwt';
import { CanDeactivateGuard } from './shared/can-deactivate/can-deactivate.guard';
import { AuthGuard, ErrorInterceptor } from './auth/_helpers';
import { HomeComponent } from './home/home.component';
import { AppService } from './meeting/services/app.service';

registerLocaleData(localeIt);

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SnackBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialDesignModule,
    NgbModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:5000"],
        blacklistedRoutes: []
      }
    })
  ],
  providers: [
    CanDeactivateGuard,
    AppService,
    { provide: LOCALE_ID, useValue: 'en-US' },
  AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
