import { FieldsValidatorsService } from '../fields-validators.service';

import { AbstractControl, FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent {
  @Input() title: string;
  @Input() formGroup: FormGroup;
  @Input() controlName: string;

  constructor(public validator: FieldsValidatorsService) { }
  
  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }

}
