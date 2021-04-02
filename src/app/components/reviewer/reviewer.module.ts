import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewerRoutingModule } from './reviewer-routing.module';
import { ReviewerDashboardComponent } from './reviewer-dashboard/reviewer-dashboard.component';
import { PrimeModule } from '../../prime.module';

@NgModule({
  declarations: [ReviewerDashboardComponent],
  imports: [CommonModule, ReviewerRoutingModule, PrimeModule],
  exports: [ReviewerDashboardComponent],
})
export class ReviewerModule {}
