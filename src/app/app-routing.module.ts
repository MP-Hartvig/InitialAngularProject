import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MoviePageComponent } from './components/movie-page/movie-page.component';
import { adminGuard } from './guards/admin.guard';
import { AdminPageComponent } from './components/admin-page/admin-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'Movies',
    component: MoviePageComponent
  },
  {
    path: 'Admin',
    component: AdminPageComponent,
    canActivate: [adminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
