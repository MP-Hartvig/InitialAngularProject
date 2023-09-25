import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/services/authentication.service';
import { Login } from 'src/app/interfaces/login';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl("", [Validators.required, Validators.minLength(6)]);

  constructor(private authService: AuthenticationService) {
  }

  submitLogin() {
    let login: Login = {username: this.email.value!, password: this.password.value!};
    this.authService.getToken(login);
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.password.hasError('minlength') ? 'Must be atleast 6 characters' : '';
  }
}
