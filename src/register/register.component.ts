import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators,} from '@angular/forms';
import { AuthService } from '../auth.service';
import { passwordMatchValidator } from '../Customvalidation/Customvalidation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private router:Router
  ) {}

  form = this.fb.group({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  }, {
    validator: passwordMatchValidator('password', 'confirmPassword') // Custom validator for password matching
  });

  // Getters for form controls
  get name() {
    return this.form.get('name');
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  onSubmit() {
    if (this.form.valid) {
      this.service.register(this.form.value).subscribe({
        next: (res) => {
          console.log('Form Submitted!', this.form.value);
          this.form.reset(); // Reset the form after successful submission
          if (this.router.url !== '/Home') {  // Prevent redundant navigation
            this.router.navigate(['/Home']);
          }
        },
        error: (error) => {
          if (error.error && error.error.message === 'Email already exists') {
            console.error('Email already exists');
          } else if (
            error.error &&
            Array.isArray(error.error.errors) &&
            error.error.errors.length > 0
          ) {
            console.error(error.error.errors[0].msg);
          }
        },
      });
    } else {
      this.form.markAllAsTouched(); // Mark all fields as touched for validation
    }
  }
}
