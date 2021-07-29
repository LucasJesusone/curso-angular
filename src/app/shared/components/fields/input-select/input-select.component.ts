import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { FieldsValidatorsService } from '../fields-validators.service';

@Component({
  selector: 'input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss']
})
export class InputSelectComponent {

  @Input() title: string;
  @Input() formGroup: FormGroup;
  @Input() controlName: string;
  @Input() options: Array<string>;

  constructor(public validator: FieldsValidatorsService) { }
  
  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }

}
