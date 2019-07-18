import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { LoginRequest, UserResponse } from './../../core/dto';
import { AuthService } from './../../core/services/auth.service';

const controlNames = {
  email: 'email',
  password: 'password'
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  readonly form: FormGroup;
  readonly currentUser: Observable<UserResponse>;

  readonly controlNames = controlNames;

  showError = false;

  constructor(private readonly formBuilder: FormBuilder, private readonly router: Router, private readonly authService: AuthService) {
    this.currentUser = this.authService.currentUser;

    this.form = this.getForm();
  }

  login() {
    const loginRequest: LoginRequest = {
      email: this.form.value[controlNames.email],
      password: this.form.value[controlNames.password]
    };

    this.authService.login(loginRequest).subscribe({
      next: () => {
        this.router.navigate(['/account']);
      },
      error: () => {
        this.showError = true;
      }
    });
  }

  logout() {
    this.authService.logout().subscribe();
  }

  private getForm() {
    return this.formBuilder.group({
      [controlNames.email]: ['', [Validators.required, Validators.email]],
      [controlNames.password]: ['', [Validators.required]]
    });
  }
}
