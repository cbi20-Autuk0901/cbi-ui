import {
  BrowserModule
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NgModule
} from '@angular/core';

import {
  AppComponent
} from './app.component';
import {
  AppRoutingModule
} from './app-routing.module';
import {
  DashboardPageComponent
} from './components/pages/dashboard-page/dashboard-page.component';
import {
  HeaderComponent
} from './components/shared/header/header.component';
import {
  SidebarComponent
} from './components/shared/sidebar/sidebar.component';
import {
  HttpClientModule
} from '@angular/common/http';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {
  LoginPageComponent
} from './components/pages/login-page/login-page.component';
import {
  certTypesPageComponent
} from './components/pages/certification-types-page/certification-types-page.component';
import {
  DebtInstrumentPageComponent
} from './components/pages/debt-instrument-page/debt-instrument-page.component';
import {
  ClimateBondInformationComponent
} from './components/shared/climate-bond-information/climate-bond-information.component';
import {
  CertificationAgreementComponent
} from './components/shared/certification-agreement/certification-agreement.component';
import {
  AssuranceReportComponent
} from './components/shared/assurance-report/assurance-report.component';
import {
  RegistrationComponent
} from './components/pages/registration/registration.component';
import { PrimeComponentsModule } from './prime-components.module';
import { CertificationsListComponent } from './components/shared/certifications-list/certifications-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardPageComponent,
    LoginPageComponent,
    HeaderComponent,
    SidebarComponent,
    certTypesPageComponent,
    DebtInstrumentPageComponent,
    ClimateBondInformationComponent,
    CertificationAgreementComponent,
    AssuranceReportComponent,
    RegistrationComponent,
    CertificationsListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeComponentsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
