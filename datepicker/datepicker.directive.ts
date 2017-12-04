import { Directive, ElementRef, OnInit, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Directive({
  selector: '[appDatepicker]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DatepickerDirective,
      multi: true
    }
  ]
})
export class DatepickerDirective implements OnInit, ControlValueAccessor {
  @Input() option: datepickerOption;
  onChangeDate: (date: string) => {};
  constructor(private el: ElementRef) { }
  ngOnInit() {
    if (this.option) {
      $(this.el.nativeElement).datepicker(this.option);
    } else {
      $(this.el.nativeElement).datepicker();
    }

    $(this.el.nativeElement).datepicker().on('changeDate', (e: any) => {
      if (this.onChangeDate) {
        this.onChangeDate($(this.el.nativeElement).datepicker('getUTCDate'));
      }
    });
  }

  writeValue(obj: string): void {
    if (obj) {
      const _data = obj.split('T')[0];
      $(this.el.nativeElement).datepicker('setDate', _data);
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeDate = fn;
  }



  registerOnTouched(fn: any): void {
  }
  setDisabledState?(isDisabled: boolean): void {
  }

}
