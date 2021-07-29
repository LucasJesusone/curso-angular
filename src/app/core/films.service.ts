import { Movie } from '../shared/models/Movie';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const url = 'http://localhost:3000/filmes/'
@Injectable({
  providedIn: 'root'
})
export class FilmsService {


  constructor(private httpCliente: HttpClient) { }


  save(movie: Movie): Observable<Movie> {
    return this.httpCliente.post<Movie>(url, movie)
  }
}
