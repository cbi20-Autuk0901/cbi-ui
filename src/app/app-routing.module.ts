import { CertificationsListComponent } from './components/shared/certifications-list/certifications-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardPageComponent } from './components/pages/dashboard-page/dashboard-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { certTypesPageComponent } from './components/pages/certification-types-page/certification-types-page.component';
import { DebtInstrumentPageComponent } from './components/pages/debt-instrument-page/debt-instrument-page.component';
import { RegistrationComponent } from './components/pages/registration/registration.component';
import { ReportsPageComponent } from './components/pages/reports-page/reports-page.component';
import { BondRedemptionComponent } from './components/pages/bond-redemption/bond-redemption.component';

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
    component: certTypesPageComponent,
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
    component: ReportsPageComponent
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
