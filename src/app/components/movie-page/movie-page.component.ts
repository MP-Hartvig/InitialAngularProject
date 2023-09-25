import { Component } from '@angular/core';
import { Movie } from 'src/app/interfaces/movie';
import { MovieService } from 'src/services/movie.service';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss']
})
export class MoviePageComponent {
  movies: Array<Movie> = new Array<Movie>();

  constructor(private movieService: MovieService) {
    this.movieService.getMovies();

    this.movieService.movies$.subscribe(x => {
      this.movies = x;
    });
  };
};
