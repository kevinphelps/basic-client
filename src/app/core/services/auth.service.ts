import { Injectable } from '@angular/core';
import { merge, of, Observable, Subject } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';

import { CreateUserRequest, LoginRequest, UserResponse } from './../dto';
import { ApiService } from './api.service';
import { LocalStorageKey, LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly currentUser: Observable<UserResponse>;

  private readonly userResponseSubject = new Subject<UserResponse>();

  constructor(private readonly apiService: ApiService, private readonly localStorageService: LocalStorageService) {
    this.currentUser = this.getCurrentUser().pipe(shareReplay(1));
  }

  getAuthToken() {
    return this.localStorageService.get<string>(LocalStorageKey.AuthToken);
  }

  login(loginRequest: LoginRequest) {
    return this.apiService.login(loginRequest).pipe(
      tap(userResponse => {
        this.updateCurrentUser(userResponse);
      })
    );
  }

  logout() {
    return this.apiService.logout().pipe(
      tap(() => {
        this.updateCurrentUser(undefined);
      })
    );
  }

  createAccount(createUserRequest: CreateUserRequest) {
    return this.apiService.createAccount(createUserRequest).pipe(
      tap(userResponse => {
        this.updateCurrentUser(userResponse);
      })
    );
  }

  private getCurrentUser() {
    const currentUser = of(undefined).pipe(
      map(() => this.getAuthToken()),
      switchMap(authToken => (authToken ? this.apiService.getCurrentUser() : of(undefined)))
    );

    return merge(currentUser, this.userResponseSubject);
  }

  private updateCurrentUser(userResponse: UserResponse) {
    if (userResponse) {
      this.localStorageService.set(LocalStorageKey.AuthToken, userResponse.token);
    } else {
      this.localStorageService.remove(LocalStorageKey.AuthToken);
    }

    this.userResponseSubject.next(userResponse);
  }
}
