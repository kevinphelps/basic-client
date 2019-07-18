import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { getMergedRouteDataSnapshot, mapRouterStateSnapshots, RouteMetadata } from './route-metadata.helpers';

@Injectable({ providedIn: 'root' })
export class RouteMetadataService {
  readonly routeMetadata: Observable<RouteMetadata>;

  constructor(private readonly router: Router) {
    this.routeMetadata = mapRouterStateSnapshots(router, getMergedRouteDataSnapshot).pipe(shareReplay(1));
  }
}
