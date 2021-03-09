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
import { DebtInstrumentPageComponent } from './components/pages/debt-instrument-page/debt-instrument-page.component';
import { ClimateBondInformationComponent } from './components/shared/climate-bond-information/climate-bond-information.component';
import { CertificationAgreementComponent } from './components/shared/certification-agreement/certification-agreement.component';
import { AssuranceReportComponent } from './components/shared/assurance-report/assurance-report.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardPageComponent,
    LoginPageComponent,
    HeaderComponent,
    SidebarComponent,
    CertificationTypesPageComponent,
    DebtInstrumentPageComponent,
    ClimateBondInformationComponent,
    CertificationAgreementComponent,
    AssuranceReportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
