import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewerRoutingModule } from './reviewer-routing.module';
import { ReviewerDashboardComponent } from './reviewer-dashboard/reviewer-dashboard.component';

@NgModule({
  declarations: [ReviewerDashboardComponent],
  imports: [CommonModule, ReviewerRoutingModule],
  exports: [ReviewerDashboardComponent],
})
export class ReviewerModule {}
