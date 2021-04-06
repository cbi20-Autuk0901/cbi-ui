import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { BadgeModule } from 'primeng/badge';
import { ChartModule } from 'primeng/chart';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { MessageModule } from 'primeng/message';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CalendarModule,
    DropdownModule,
    ProgressSpinnerModule,
    ToastModule,
    TableModule,
    PaginatorModule,
    DialogModule,
    BadgeModule,
    ChartModule,
    ScrollPanelModule,
    MessageModule,
  ],
  exports: [
    CalendarModule,
    DropdownModule,
    ProgressSpinnerModule,
    ToastModule,
    TableModule,
    PaginatorModule,
    DialogModule,
    BadgeModule,
    ChartModule,
    ScrollPanelModule,
    MessageModule,
  ],
  providers: [MessageService],
})
export class PrimeModule {}
