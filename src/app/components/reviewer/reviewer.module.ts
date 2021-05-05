import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewerRoutingModule } from './reviewer-routing.module';
import { ReviewerDashboardComponent } from './reviewer-dashboard/reviewer-dashboard.component';
import { PrimeModule } from '../../prime.module';
import { WorkBoardComponent } from './work-board/work-board.component';
import { NgxWigModule } from 'ngx-wig';
import { ReviewerReportsComponent } from './reviewer-reports/reviewer-reports.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { ReviewerSidebarComponent } from './reviewer-sidebar/reviewer-sidebar.component';
import { ReviewerCertificationQueueComponent } from './reviewer-certification-queue/reviewer-certification-queue.component';

@NgModule({
  declarations: [
    ReviewerDashboardComponent,
    ReviewerCertificationQueueComponent,
    WorkBoardComponent,
    ReviewerReportsComponent,
    ReviewerSidebarComponent,
  ],
  imports: [CommonModule, ReviewerRoutingModule, PrimeModule, NgxWigModule, NgxExtendedPdfViewerModule],
  exports: [ReviewerDashboardComponent, ReviewerSidebarComponent],
})
export class ReviewerModule {}
