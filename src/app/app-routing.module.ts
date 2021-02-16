import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './components/pages/dashboard/dashboard.component';
import {LoginComponent} from './components/pages/login/login.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})


export class AppRoutingModule {
}
