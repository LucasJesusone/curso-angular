import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  options: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.options = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength]],
      urlPhoto: ['', Validators.required],
      dtLancamento: ['', Validators.required],
      description: [''],
      nota: ['0', [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDb: ['', Validators.minLength(10)],
      gender: ['', Validators.required]
    });

  }

}
