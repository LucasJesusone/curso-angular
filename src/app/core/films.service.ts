import { environment } from './../../environments/environment';
import { Movie } from './../shared/models/Movie';
import { ConfigParamsService } from './config-params.service';
import { ConfigParams } from './../shared/models/config-params';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
  providedIn: "root",
})
export class FilmsService {
  private baseUrlService: string;
  constructor(private httpCliente: HttpClient, private configService: ConfigParamsService) {
    this.baseUrlService = environment.url
  }

  save(movie: Movie): Observable<Movie> {
    return this.httpCliente.post<Movie>(this.baseUrlService, movie);
  }

  getAll(config: ConfigParams): Observable<Movie[]> {
    const configParams = this.configService.configureParams(config)
    return this.httpCliente.get<Movie[]>(this.baseUrlService, { params: configParams });
  }

  getAllWithoutFilter(): Observable<Movie[]> {
    // const configParams = this.configService.configureParams()
    return this.httpCliente.get<Movie[]>(this.baseUrlService);
  }

  view(id: number): Observable<Movie> {
    return this.httpCliente.get<Movie>(this.baseUrlService + id)
  }


  delete(id: number): Observable<void>{
    return this.httpCliente.delete<void>(this.baseUrlService + id)
  }


  edit(movie: Movie): Observable<Movie> {
    return this.httpCliente.put<Movie>(this.baseUrlService + movie.id, movie)
  }
  
}
