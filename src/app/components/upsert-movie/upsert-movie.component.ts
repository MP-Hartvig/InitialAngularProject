import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Movie } from 'src/app/interfaces/movie';
import { MovieService } from 'src/services/movie.service';

@Component({
  selector: 'app-upsert-movie',
  templateUrl: './upsert-movie.component.html',
  styleUrls: ['./upsert-movie.component.scss']
})
export class UpsertMovieComponent {
  title = new FormControl('', [Validators.required, Validators.minLength(2)]);
  releaseDate = new FormControl(new Date(), [Validators.required]);
  movie: Movie;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Movie | null, private matDialogRef: MatDialogRef<UpsertMovieComponent>, private movieService: MovieService) {
    if (data != null) {
      this.movie = data;
      let date: Date = new Date(data.releaseDate);
      this.title.setValue(data.title);
      this.releaseDate.setValue(date);
    }
    else {
      this.movie = { id: "0", title: "", releaseDate: "" };
    };
  };

  submitMovie() {
    this.movie = { id: this.movie.id, title: this.title.value!, releaseDate: this.releaseDate.value?.toLocaleString("en-DK").slice(0, 10)!};
    this.data != null ? this.movieService.updateMovie(this.movie) : this.movieService.createMovie(this.movie);
    this.matDialogRef.close();
  };

  getTitleErrorMessage() {
    if (this.title.hasError('required')) {
      return 'You must enter a value';
    };

    return this.title.hasError('minlength') ? 'Must be atleast 2 characters' : '';
  };

  getReleaseDateErrorMessage() {
    return this.releaseDate.hasError('required') ? 'You must pick a date' : '';
  };
};
