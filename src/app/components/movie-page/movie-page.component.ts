import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Movie } from 'src/app/interfaces/movie';
import { MovieService } from 'src/services/movie.service';
import { UpsertMovieComponent } from '../upsert-movie/upsert-movie.component';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss']
})
export class MoviePageComponent {
  movies: Array<Movie> = new Array<Movie>();
  // movies: MatTableDataSource<Movie> = new MatTableDataSource();

  constructor(private movieService: MovieService, private matDialog: MatDialog) {
    this.movieService.getMovies();

    this.movieService.movies$.subscribe(x => {
      this.movies = x;
    });
  };

  CreateMovie() {
    this.matDialog.open(UpsertMovieComponent, {
      width: '50%',
      disableClose: true,
      data: null
    });
  };

  EditMovie(movie: Movie) {
    this.matDialog.open(UpsertMovieComponent, {
      width: '50%',
      disableClose: true,
      data: movie
    });
  };

  DeleteMovie(movie: Movie) {
    this.movieService.deleteMovie(movie);
  };
};
