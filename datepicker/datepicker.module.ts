import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerDirective } from './datepicker.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DatepickerDirective],
  exports: [DatepickerDirective]
})
export class DatepickerModule {
}
