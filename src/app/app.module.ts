import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { RbacAllowDirective } from './common/rbac-allow.directive';
import { LessonsComponent } from './lessons/lessons.component';
import { LoginComponent } from './login/login.component';
import { routesConfig } from './routes.config';
import { AuthService } from './services/auth.service';
import { AuthorizationGuard } from './services/authorization.guard';
import { LessonsService } from './services/lessons.service';
import { SignupComponent } from './signup/signup.component';

export function createAdminOnlyGuard(authService: AuthService, router: Router) {
  return new AuthorizationGuard(["ADMIN"], authService, router);
}

@NgModule({
  declarations: [
    AppComponent,
    LessonsComponent,
    LoginComponent,
    SignupComponent,
    AdminComponent,
    RbacAllowDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: "XSRF-TOKEN",
      headerName: "x-xsrf-token",
    }),
    RouterModule.forRoot(routesConfig),
    ReactiveFormsModule,
  ],
  providers: [
    LessonsService,
    AuthService,
    {
      provide: "adminsOnlyGuard",
      useFactory: createAdminOnlyGuard,
      deps: [AuthService, Router],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
