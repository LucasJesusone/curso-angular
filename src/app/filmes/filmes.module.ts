import { FieldsModule } from './../shared/components/fields/fields.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll'

import { CadastroFilmesComponent } from './cadastro-filmes/cadastro-filmes.component';
import { MaterialModule } from '../shared/material/material.module';
import { ListagemFilmesComponent } from './listagem-filmes/listagem-filmes.component';

@NgModule({
  imports: [
    InfiniteScrollModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FieldsModule
  ],
  declarations: [CadastroFilmesComponent, ListagemFilmesComponent]
})
export class  FilmesModule { }
