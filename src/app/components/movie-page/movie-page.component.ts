import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Movie } from 'src/app/interfaces/movie';
import { MovieService } from 'src/services/movie.service';
import { UpsertMovieComponent } from '../upsert-movie/upsert-movie.component';
import { AuthenticationService } from 'src/services/authentication.service';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss']
})
export class MoviePageComponent {
  admin$: Observable<boolean>;
  dataSource: MatTableDataSource<Movie> = new MatTableDataSource<Movie>();
  displayedColumns: Array<string> = ["Id", "Title", "Release date"];


  constructor(private movieService: MovieService, private matDialog: MatDialog, private authService: AuthenticationService) {
    this.movieService.getMovies();
    this.admin$ = this.authService.admin$;
    this.authService.admin$.subscribe(x => {
      if (x) {
        this.displayedColumns.push("Edit");
        this.displayedColumns.push("Delete");
      }
    })
    this.movieService.movies$.subscribe(x => {
      this.dataSource.data = x;
      this.dataSource._updateChangeSubscription();
    });
  }

  EditMovie(movie: Movie) {
    this.matDialog.open(UpsertMovieComponent, {
      width: '50%',
      data: movie
    });
  };

  DeleteMovie(movie: Movie) {
    this.movieService.deleteMovie(movie);
  };
};
