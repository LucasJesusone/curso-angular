import { Movie } from './../shared/models/Movie';
import { ConfigParamsService } from './config-params.service';
import { ConfigParams } from './../shared/models/config-params';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

const url = "http://localhost:3000/filmes/";
@Injectable({
  providedIn: "root",
})
export class FilmsService {
  constructor(private httpCliente: HttpClient, private configService: ConfigParamsService) {}

  save(movie: Movie): Observable<Movie> {
    return this.httpCliente.post<Movie>(url, movie);
  }

  getAll(config: ConfigParams): Observable<Movie[]> {
    const configParams = this.configService.configureParams(config)
    return this.httpCliente.get<Movie[]>(url, { params: configParams });
  }

  view(id: number): Observable<Movie> {
    return this.httpCliente.get<Movie>(url + id)
  }


  delete(id: number): Observable<void>{
    return this.httpCliente.delete<void>(url + id)
  }
}
