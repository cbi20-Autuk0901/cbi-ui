import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PrimeModule } from '../../prime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { IssuerModule } from '../issuer/issuer.module';
import { ReviewerModule } from '../reviewer/reviewer.module';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    LoginPageComponent,
    RegistrationComponent,
    DashboardPageComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    PrimeModule,
    FormsModule,
    ReactiveFormsModule,
    IssuerModule,
    ReviewerModule,
  ],
  exports: [HeaderComponent, SidebarComponent],
})
export class SharedModule {}
