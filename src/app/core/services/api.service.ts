import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../../environments/environment';
import { CreateUserRequest, LoginRequest, UserResponse } from './../dto';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private readonly httpClient: HttpClient) {}

  login(loginRequest: LoginRequest) {
    return this.httpClient.post<UserResponse>(`${environment.api}/users/login`, loginRequest);
  }

  logout() {
    return this.httpClient.delete(`${environment.api}/users/logout`);
  }

  getCurrentUser() {
    return this.httpClient.get<UserResponse>(`${environment.api}/users/me`);
  }

  createAccount(createUserRequest: CreateUserRequest) {
    return this.httpClient.post<UserResponse>(`${environment.api}/users`, createUserRequest);
  }
}
