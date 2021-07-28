import { AbstractControl, FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { FieldsValidatorsService } from '../fields-validators.service';

@Component({
  selector: 'input-textarea',
  templateUrl: './input-textarea.component.html',
  styleUrls: ['./input-textarea.component.scss']
})
export class InputTextareaComponent {
  @Input() description: string;
  @Input() formGroup: FormGroup;
  @Input() controlName: string;

  constructor(public validators: FieldsValidatorsService) { }
  
  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }

}
