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

  createMovie(movie: Movie) {
    this.httpClient.post<Movie[]>(this.url, movie, {headers: this.setHttpHeader.setAuthHeader()},).subscribe(x => {
      this.movieSubject$.next(x);
    });
  };

  updateMovie(movie: Movie) {
    const headers = this.setHttpHeader.setAuthHeader();
    const httpOptions = {
      headers: headers
    };
    this.httpClient.put<Movie[]>(this.url, movie, httpOptions).subscribe(x => {
      this.movieSubject$.next(x);
    });
  };

  deleteMovie(movie: Movie) {
    const headers = this.setHttpHeader.setAuthHeader();
    const httpOptions = {
      headers: headers
    };
    this.httpClient.delete<Movie[]>(this.url + '/' + movie.id, httpOptions).subscribe(x => {
      this.movieSubject$.next(x);
    });
  };
};
