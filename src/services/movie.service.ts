import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Movie } from 'src/app/interfaces/movie';
import { SetHttpHeader } from 'src/app/utility/set-http-header';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  url: string = environment.config.apiUrl + "/api/Movie";
  private movies: Array<Movie> = [];
  private movieSubject$: Subject<Movie[]> = new BehaviorSubject<Movie[]>(this.movies);
  movies$: Observable<Movie[]> = this.movieSubject$.asObservable();

  constructor(public httpClient: HttpClient, private setHttpHeader: SetHttpHeader) { }

  getMovies() {
    const headers = this.setHttpHeader.setAuthHeader();
    const httpOptions = {
      headers: headers
    };
    this.httpClient.get<Movie[]>(this.url, httpOptions).subscribe(x => {
      this.movieSubject$.next(x);
    });
  };
};
