import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatInputModule, MatToolbarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxLetModule } from '@ngx-utilities/ngx-let';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { authorizationHeaderHttpInterceptorProvider } from './core/http-interceptors/authorization-header.http-interceptor';
import { AccountComponent } from './pages/account/account.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [AppComponent, AccountComponent, CreateAccountComponent, LoginComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxLetModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    AppRoutingModule
  ],
  providers: [authorizationHeaderHttpInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule {}
