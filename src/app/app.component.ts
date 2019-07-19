import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { UserResponse } from './core/dto';
import { AuthService } from './core/services/auth.service';
import { RouteMetadata } from './core/services/route-metadata.helpers';
import { RouteMetadataService } from './core/services/route-metadata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly currentUser: Observable<UserResponse>;
  readonly routeMetadata: Observable<RouteMetadata>;

  constructor(private readonly authService: AuthService, private readonly routeMetadataService: RouteMetadataService) {
    this.currentUser = this.authService.currentUser;
    this.routeMetadata = this.routeMetadataService.routeMetadata;
  }
}
