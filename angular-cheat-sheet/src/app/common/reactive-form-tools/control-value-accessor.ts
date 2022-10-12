import { Component, Injector, Input, ViewChild } from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, FormControl, FormControlDirective } from '@angular/forms'

@Component({template: ''})
export class ControlValueAccesorConnectorComponent implements ControlValueAccessor {

  @ViewChild(FormControlDirective, { static: true })
  formControlDirective: FormControlDirective | undefined;

  @Input() formControl: FormControl = new FormControl;
  @Input() formControlName: string = ''
  
  get controlContainer(): ControlContainer {
    return this._injector.get(ControlContainer);
  }
  get control(): FormControl {
    const formControl = this.formControl || this.controlContainer.control?.get(this.formControlName);
    return formControl as FormControl;
  }

  constructor(private _injector: Injector) {}

  writeValue(obj: any): void {
    if (!this.formControlDirective) return ;
    this.formControlDirective.valueAccessor?.writeValue(obj);
  }

  registerOnChange(fn: any): void {
    if (!this.formControlDirective) return ;
    this.formControlDirective.valueAccessor?.registerOnChange(fn);
  }

  registerOnTouched(fn: any): void {
    if (!this.formControlDirective) return ;
    this.formControlDirective.valueAccessor?.registerOnTouched(fn);
  }
}