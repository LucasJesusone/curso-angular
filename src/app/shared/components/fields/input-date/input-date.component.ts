import { AbstractControl, FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { FieldsValidatorsService } from '../fields-validators.service';

@Component({
  selector: 'input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss']
})
export class InputDateComponent {

  @Input() title: string;
  @Input() formGroup: FormGroup;
  @Input() controlName: string;

  constructor(public validators: FieldsValidatorsService) { }
  
  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }

}
