import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssuerRoutingModule } from './issuer-routing.module';
import { BondRedemptionComponent } from './bond-redemption/bond-redemption.component';
import { CertTypesPageComponent } from './certification-types-page/certification-types-page.component';
import { DebtInstrumentPageComponent } from './debt-instrument-page/debt-instrument-page.component';
import { PrimeModule } from '../../prime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClimateBondInformationComponent } from './climate-bond-information/climate-bond-information.component';
import { CertificationAgreementComponent } from './certification-agreement/certification-agreement.component';
import { AssuranceReportComponent } from './assurance-report/assurance-report.component';
import { CertificationsListComponent } from './certifications-list/certifications-list.component';
import { SharedModule } from 'primeng/api';
import { IssuerDashboardComponent } from './issuer-dashboard/issuer-dashboard.component';
import { IssuerReportsComponent } from './issuer-reports/issuer-reports.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@NgModule({
  declarations: [
    BondRedemptionComponent,
    CertTypesPageComponent,
    DebtInstrumentPageComponent,
    IssuerReportsComponent,
    ClimateBondInformationComponent,
    CertificationAgreementComponent,
    AssuranceReportComponent,
    CertificationsListComponent,
    IssuerDashboardComponent,
  ],
  imports: [
    CommonModule,
    IssuerRoutingModule,
    PrimeModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxExtendedPdfViewerModule,
  ],
  exports: [IssuerDashboardComponent],
})
export class IssuerModule {}
