import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardPageComponent } from './components/pages/dashboard-page/dashboard-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { CertificationTypesPageComponent } from './components/pages/certification-types-page/certification-types-page.component';
import { FormEntryPageComponent } from './components/pages/form-entry-page/form-entry-page.component';

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
    path: 'form-entry/:type',
    canActivate: [AuthGuard],
    component: FormEntryPageComponent,
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
