import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeModule } from './prime.module';
import { CommonModule } from '@angular/common';
import { IssuerModule } from './components/issuer/issuer.module';
import { SharedModule } from './components/shared/shared.module';
import { ReviewerModule } from './components/reviewer/reviewer.module';
import { LoaderInterceptor } from './interceptors/loader.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    PrimeModule,
    IssuerModule,
    SharedModule,
    ReviewerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
