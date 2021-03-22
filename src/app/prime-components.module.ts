import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CalendarModule,
    DropdownModule,
    ProgressSpinnerModule,
    ToastModule,
    TableModule,
    PaginatorModule
  ],
  exports: [
    CalendarModule,
    DropdownModule,
    ProgressSpinnerModule,
    ToastModule,
    TableModule,
    PaginatorModule

  ],
  providers: [
    MessageService
  ]
})
export class PrimeComponentsModule { }
