import { Component } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular movie project';
  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthenticationService) {
    this.isLoggedIn$ = this.authService.loggedIn$;
  }

  Logout() {
    this.authService.removeToken();
  }
}
