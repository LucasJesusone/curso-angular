import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective
     | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  form: FormGroup;
  submitted = false

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      urlPhoto: ['', Validators.required],
      dtLancamento: ['', Validators.required],
      description: ['', [Validators.maxLength(100)]],
      nota: ['0', [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDb: ['', Validators.required],
      gender: ['', Validators.required]
    });

  }

  
  resetForm(): void{
    this.form.reset()
  }
  goBack() {
    this.router.navigate(['/filmes'])
  }

  save(): void {
    this.submitted = true
    if(this.form.invalid) {
      return
    }

    console.log(this.form.value)

    alert('Success' + JSON.stringify(this.form.value, null, 4));
  }

}
