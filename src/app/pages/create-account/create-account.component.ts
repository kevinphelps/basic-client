import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { CreateUserRequest, UserResponse } from './../../core/dto';
import { AuthService } from './../../core/services/auth.service';

const controlNames = {
  firstName: 'first name',
  lastName: 'last name',
  email: 'email',
  password: 'password',
  passwordConfirmation: 'password confirmation'
};

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html'
})
export class CreateAccountComponent {
  readonly form: FormGroup;
  readonly currentUser: Observable<UserResponse>;

  readonly controlNames = controlNames;

  showError = false;

  constructor(private readonly formBuilder: FormBuilder, private readonly router: Router, private readonly authService: AuthService) {
    this.currentUser = this.authService.currentUser;

    this.form = this.getForm();
  }

  createAccount() {
    const createUserRequest: CreateUserRequest = {
      first_name: this.form.value[controlNames.firstName],
      last_name: this.form.value[controlNames.lastName],
      email: this.form.value[controlNames.email],
      password: this.form.value[controlNames.password],
      password_confirmation: this.form.value[controlNames.passwordConfirmation]
    };

    this.authService.createAccount(createUserRequest).subscribe({
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
    return this.formBuilder.group(
      {
        [controlNames.firstName]: ['', [Validators.required]],
        [controlNames.lastName]: ['', [Validators.required]],
        [controlNames.email]: ['', [Validators.required, Validators.email]],
        [controlNames.password]: ['', [Validators.required]],
        [controlNames.passwordConfirmation]: ['', [Validators.required]]
      },
      {
        validator: validatePasswordConfirmation
      }
    );
  }
}

function validatePasswordConfirmation(form: FormGroup) {
  const password = form.controls[controlNames.password].value;
  const passwordConfirmation = form.controls[controlNames.passwordConfirmation].value;

  return password === passwordConfirmation ? null : { passwordMismatch: true };
}
