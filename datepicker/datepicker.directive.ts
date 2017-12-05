import { Directive, ElementRef, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DatepickerOption } from './index';
import { DatepickerService } from './datepicker.service';

@Directive({
  selector: '[appDatepicker]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DatepickerDirective,
      multi: true
    }
  ],
  exportAs: 'appDatepicker'
})
export class DatepickerDirective implements OnInit, ControlValueAccessor, OnDestroy {

  @Input() option: DatepickerOption;
  @Output() change = new EventEmitter();

  private changeDate = new BehaviorSubject<any>(null);
  changeDate$ = this.changeDate.asObservable();

  onChangeDate: (date: string) => {};

  constructor(private el: ElementRef, private datepickerService: DatepickerService) { }

  ngOnInit() {
    this.el.nativeElement.datepickerFun = this;
    this.datepickerService.element.push(this.el.nativeElement.datepickerFun);
    if (this.option) {
      $(this.el.nativeElement).datepicker(this.option);
    } else {
      $(this.el.nativeElement).datepicker();
    }

    $(this.el.nativeElement).datepicker().on('changeDate', (e: any) => {
      if (this.onChangeDate) {
        this.onChangeDate($(this.el.nativeElement).datepicker('getUTCDate'));
      }
      this.change.emit(e);
      this.changeDate.next(e);
    });
  }



  ngOnDestroy(): void {
    const filterIndex = this.datepickerService.element.findIndex(data => data === this.el.nativeElement.datepickerFun);
    this.datepickerService.element.splice(filterIndex, 1);
    $(this.el.nativeElement).datepicker('destroy');
  }










  writeValue(obj: string): void {
    if (obj) {
      try {
        const _data = obj.split('T')[0];
        $(this.el.nativeElement).datepicker('setDate', _data);
      } catch (e) {
        $(this.el.nativeElement).datepicker('setDate', obj);
      }
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
