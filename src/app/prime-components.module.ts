import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CalendarModule
  ],
  exports: [
    CalendarModule
  ]
})
export class PrimeComponentsModule { }
