import { Component, Injector, Input, OnInit } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccesorConnectorComponent } from '../../reactive-form-tools/control-value-accessor';

@Component({
  selector: 'input-custom',
  templateUrl: './input-custom.component.html',
  styleUrls: ['./input-custom.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: InputCustomComponent,
    multi: true
  }]
})
export class InputCustomComponent extends ControlValueAccesorConnectorComponent implements OnInit {

  @Input() inputId: string = '';
  @Input() lablel: string = '';
  @Input() inputType: string = '';
  @Input() placeholder: string = '';
  @Input() width: string = '280';

  customWidth: string = '';

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    // this.customWidth = `width: ${this.width};`;
  }

}
