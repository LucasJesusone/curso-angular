import { Movie } from './../../shared/models/Movie';
import { FilmsService } from './../../core/films.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  movies: Movie[];

  constructor(private service: FilmsService) { }

  ngOnInit() {
    this.service.getAll().subscribe((movies: Movie[]) => this.movies = movies)
  }

}
