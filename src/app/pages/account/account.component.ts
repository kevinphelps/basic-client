import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { UserResponse } from './../../core/dto';
import { AuthService } from './../../core/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'
})
export class AccountComponent {
  readonly currentUser: Observable<UserResponse>;

  constructor(private readonly authService: AuthService) {
    this.currentUser = this.authService.currentUser;
  }

  logout() {
    this.authService.logout().subscribe();
  }
}
