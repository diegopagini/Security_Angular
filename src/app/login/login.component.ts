import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css", "../common/forms.css"],
})
export class LoginComponent {
  form: FormGroup;
  messagePerErrorCode = {
    loginfailed: "Invalid credentials",
  };
  errors = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ["test@gmail.com", Validators.required],
      password: ["Password10", Validators.required],
    });
  }

  login(): void {
    const val = this.form.value;
    if (val.email && val.password) {
      this.authService.login(val.email, val.password).subscribe(() => {
        console.log("User is logged in");
        this.router.navigateByUrl("/");
      });
    }
  }
}
