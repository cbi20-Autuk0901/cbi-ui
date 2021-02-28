import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardPageComponent } from './components/pages/dashboard-page/dashboard-page.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { CertificationTypesPageComponent } from './components/pages/certification-types-page/certification-types-page.component';
import { environment } from '../environments/environment';

import { StoreModule } from '@ngrx/store';
import { reducer } from './reducers/data-store.reducer';
import { NgrxComponent } from './components/shared/ngrx/ngrx.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardPageComponent,
    LoginPageComponent,
    HeaderComponent,
    SidebarComponent,
    CertificationTypesPageComponent,
    NgrxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      dataStore: reducer,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
