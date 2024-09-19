import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit() {
    if (this.form.valid) {
      // Cast form values to ensure they are strings
      const loginData = {
        email: this.form.value.email as string,
        password: this.form.value.password as string,
      };

      this.authService.login(loginData).subscribe({
        next: (res) => {
          console.log('Login Successful!', res);
          localStorage.setItem('authToken', JSON.stringify(res));
          if (this.router.url !== '/Home') {  // Prevent redundant navigation
            this.router.navigate(['/Home']);
          }
        },
        error: (error) => {
          console.error('Login Error:', error.error.message);
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}

