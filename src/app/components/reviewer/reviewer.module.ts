import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewerRoutingModule } from './reviewer-routing.module';
import { ReviewerDashboardComponent } from './reviewer-dashboard/reviewer-dashboard.component';
import { PrimeModule } from '../../prime.module';
import { CertificationQueueComponent } from './certification-queue/certification-queue.component';
import { WorkBoardComponent } from './work-board/work-board.component';
import { NgxWigModule } from 'ngx-wig';

@NgModule({
  declarations: [
    ReviewerDashboardComponent,
    CertificationQueueComponent,
    WorkBoardComponent,
  ],
  imports: [CommonModule, ReviewerRoutingModule, PrimeModule, NgxWigModule],
  exports: [ReviewerDashboardComponent],
})
export class ReviewerModule {}
