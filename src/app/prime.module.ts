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
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { ProgressBarModule } from 'primeng/progressbar';
import { BlockUIModule } from 'primeng/blockui';

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
    InputTextModule,
    DividerModule,
    ProgressBarModule,
    BlockUIModule,
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
    InputTextModule,
    DividerModule,
    ProgressBarModule,
    BlockUIModule,
  ],
  providers: [MessageService],
})
export class PrimeModule {}
