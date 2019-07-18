import { HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';

import { environment } from './../../../environments/environment';
import { AuthService } from './../services/auth.service';

@Injectable()
export class AuthorizationHeaderHttpInterceptor implements HttpInterceptor {
  constructor(private readonly authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getAuthToken();

    if (authToken && req.url.startsWith(environment.api)) {
      const reqWithAuthToken = req.clone({
        headers: req.headers.append('Authorization', `Token token=${authToken}`)
      });

      return next.handle(reqWithAuthToken);
    } else {
      return next.handle(req);
    }
  }
}

export const authorizationHeaderHttpInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthorizationHeaderHttpInterceptor,
  multi: true
};
