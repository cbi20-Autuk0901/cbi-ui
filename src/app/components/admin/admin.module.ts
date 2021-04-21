import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AdminReportsComponent } from './admin-reports/admin-reports.component';
import { PrimeModule } from '../../prime.module';
import { AdminCertificationQueueComponent } from './admin-certification-queue/admin-certification-queue.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminSidebarComponent,
    AdminReportsComponent,
    AdminCertificationQueueComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, PrimeModule],
  exports: [AdminSidebarComponent, AdminDashboardComponent],
})
export class AdminModule {}
