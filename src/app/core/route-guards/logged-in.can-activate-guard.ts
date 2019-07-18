import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { from, of } from 'rxjs';
import { first, mapTo, switchMap } from 'rxjs/operators';

import { AuthService } from './../services/auth.service';

@Injectable({ providedIn: 'root' })
export class LoggedInCanActivateGuard implements CanActivate {
  constructor(private readonly router: Router, private readonly authService: AuthService) {}

  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
    return this.authService.currentUser.pipe(
      first(),
      switchMap(currentUser => (currentUser ? of(true) : from(this.router.navigate(['/login'])).pipe(mapTo(false))))
    );
  }
}
