import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { FieldsValidatorsService } from '../fields-validators.service';

@Component({
  selector: 'input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss']
})
export class InputNumberComponent {

  @Input() title: string;
  @Input() formGroup: FormGroup;
  @Input() controlName: string;
  @Input() min = 0
  @Input() max = 10
  @Input() step = 1
  constructor(public validators: FieldsValidatorsService) { }
  
  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }

}
