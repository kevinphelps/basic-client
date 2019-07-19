import { ActivatedRouteSnapshot, NavigationEnd, Route, Router, RouterStateSnapshot } from '@angular/router';
import { merge, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export interface AppRoute extends Route {
  data?: RouteMetadata;
}

export interface RouteMetadata {
  loginPage: boolean;
}

export function getMergedRouteDataSnapshot(snapshot: ActivatedRouteSnapshot | RouterStateSnapshot) {
  let data: { [key: string]: any } = {};
  let route = snapshot.root;
  do {
    data = { ...data, ...route.data };
    route = route.firstChild;
  } while (route);

  return data as RouteMetadata;
}

export function mapRouterStateSnapshots<T>(router: Router, selector: (snapshot: RouterStateSnapshot) => T) {
  const currentRoute = of(router.routerState.snapshot);

  const futureRoutes = router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map(() => router.routerState.snapshot)
  );

  return merge(currentRoute, futureRoutes).pipe(map(snapshot => selector(snapshot)));
}
