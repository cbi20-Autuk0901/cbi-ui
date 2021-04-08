import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewerRoutingModule } from './reviewer-routing.module';
import { ReviewerDashboardComponent } from './reviewer-dashboard/reviewer-dashboard.component';
import { PrimeModule } from '../../prime.module';
import { CertificationQueueComponent } from './certification-queue/certification-queue.component';

@NgModule({
  declarations: [ReviewerDashboardComponent, CertificationQueueComponent],
  imports: [CommonModule, ReviewerRoutingModule, PrimeModule],
  exports: [ReviewerDashboardComponent],
})
export class ReviewerModule {}
