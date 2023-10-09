import { Component } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular movie project';
  isLoggedIn$: Observable<boolean>;
  admin$: Observable<boolean>;

  constructor(private authService: AuthenticationService, private router: Router) {
    this.isLoggedIn$ = this.authService.loggedIn$;
    this.admin$ = this.authService.admin$;
  }

  Logout() {
    this.authService.removeToken();
  }
}
