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
import { ReportsPageComponent } from './components/issuer/reports-page/reports-page.component';
import { BondRedemptionComponent } from './components/issuer/bond-redemption/bond-redemption.component';
import { CertificationQueueComponent } from './components/reviewer/certification-queue/certification-queue.component';

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
    path: 'reports',
    canActivate: [AuthGuard],
    component: ReportsPageComponent,
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
