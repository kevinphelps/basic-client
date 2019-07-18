import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoggedInCanActivateGuard } from './core/route-guards/logged-in.can-activate-guard';
import { AppRoute } from './core/services/route-metadata.helpers';
import { AccountComponent } from './pages/account/account.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { LoginComponent } from './pages/login/login.component';

const routes: AppRoute[] = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      loginPage: true
    }
  },
  {
    path: 'create-account',
    component: CreateAccountComponent
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [LoggedInCanActivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
