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
import { FormEntryPageComponent } from './components/pages/form-entry-page/form-entry-page.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { loginReducer } from './reducers/login.reducer';
import { ClimateBondInformationComponent } from './components/shared/climate-bond-information/climate-bond-information.component';
import { CertificationAgreementComponent } from './components/shared/certification-agreement/certification-agreement.component';
import { GreenBondComponent } from './components/shared/green-bond/green-bond.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardPageComponent,
    LoginPageComponent,
    HeaderComponent,
    SidebarComponent,
    CertificationTypesPageComponent,
    FormEntryPageComponent,
    ClimateBondInformationComponent,
    CertificationAgreementComponent,
    GreenBondComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ login: loginReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
