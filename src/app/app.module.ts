import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeModule } from './prime.module';
import { CommonModule } from '@angular/common';
import { IssuerModule } from './components/issuer/issuer.module';
import { SharedModule } from './components/shared/shared.module';
import { ReviewerModule } from './components/reviewer/reviewer.module';

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
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
