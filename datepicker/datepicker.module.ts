import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerDirective } from './datepicker.directive';
import { DatepickerService } from './datepicker.service';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DatepickerDirective],
  exports: [DatepickerDirective],
  providers: [DatepickerService]
})
export class DatepickerModule { }
