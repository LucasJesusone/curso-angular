import { FieldsModule } from './../shared/components/fields/fields.module';
import { InputTextComponent } from './../shared/components/fields/input-text/input-text.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CadastroFilmesComponent } from './cadastro-filmes/cadastro-filmes.component';
import { MaterialModule } from '../shared/material/material.module';
import { ListagemFilmesComponent } from './listagem-filmes/listagem-filmes.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FieldsModule
  ],
  declarations: [CadastroFilmesComponent, ListagemFilmesComponent]
})
export class  FilmesModule { }
