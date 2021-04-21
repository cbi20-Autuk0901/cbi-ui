import { CertificationsListComponent } from './components/issuer/certifications-list/certifications-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardPageComponent } from './components/shared/dashboard-page/dashboard-page.component';
import { LoginPageComponent } from './components/shared/login-page/login-page.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { CertTypesPageComponent } from './components/issuer/certification-types-page/certification-types-page.component';
import { DebtInstrumentPageComponent } from './components/issuer/debt-instrument-page/debt-instrument-page.component';
import { RegistrationComponent } from './components/shared/registration/registration.component';
import { BondRedemptionComponent } from './components/issuer/bond-redemption/bond-redemption.component';
import { CertificationQueueComponent } from './components/reviewer/certification-queue/certification-queue.component';
import { WorkBoardComponent } from './components/reviewer/work-board/work-board.component';
import { IssuerReportsComponent } from './components/issuer/issuer-reports/issuer-reports.component';
import { ReviewerReportsComponent } from './components/reviewer/reviewer-reports/reviewer-reports.component';
import { IssuerDashboardComponent } from './components/issuer/issuer-dashboard/issuer-dashboard.component';
import { ReviewerDashboardComponent } from './components/reviewer/reviewer-dashboard/reviewer-dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardPageComponent,
  },
  { path: 'login', canActivate: [AuthGuard], component: LoginPageComponent },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: 'certification-types',
    canActivate: [AuthGuard],
    component: CertTypesPageComponent,
  },
  {
    path: 'certification-queue',
    canActivate: [AuthGuard],
    component: CertificationQueueComponent,
  },
  {
    path: 'work-board',
    canActivate: [AuthGuard],
    component: WorkBoardComponent,
  },
  {
    path: 'debt-instrument/:certType/:instrType',
    canActivate: [AuthGuard],
    component: DebtInstrumentPageComponent,
  },
  {
    path: 'certifications-listing',
    canActivate: [AuthGuard],
    component: CertificationsListComponent,
  },
  {
    path: 'bond-redemption/:instrType',
    canActivate: [AuthGuard],
    component: BondRedemptionComponent,
  },
  {
    path: 'issuer-reports',
    canActivate: [AuthGuard],
    component: IssuerReportsComponent,
  },
  {
    path: 'reviewer-reports',
    canActivate: [AuthGuard],
    component: ReviewerReportsComponent,
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
