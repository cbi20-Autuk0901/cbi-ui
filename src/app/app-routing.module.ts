import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardPageComponent } from './components/pages/dashboard-page/dashboard-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { CertificationTypesPageComponent } from './components/pages/certification-types-page/certification-types-page.component';
import { DebtInstrumentPageComponent } from './components/pages/debt-instrument-page/debt-instrument-page.component';

const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardPageComponent,
  },
  { path: 'login', canActivate: [AuthGuard], component: LoginPageComponent },
  {
    path: 'certification-types',
    canActivate: [AuthGuard],
    component: CertificationTypesPageComponent,
  },
  {
    path: 'debt-instrument/:type',
    canActivate: [AuthGuard],
    component: DebtInstrumentPageComponent,
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
