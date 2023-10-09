import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UpsertMovieComponent } from '../upsert-movie/upsert-movie.component';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {

  constructor(private matDialog: MatDialog) {
  };

  CreateMovie() {
    this.matDialog.open(UpsertMovieComponent, {
      width: '50%',
      data: null
    });
  };
};
