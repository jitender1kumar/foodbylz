import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employeelogin',
  standalone: false,
  templateUrl: './employeelogin.component.html',
  styleUrl: './employeelogin.component.css'
})
export class EmployeeloginComponent {
loginForm: any;
errorMessage: string = '';

constructor(private fb: FormBuilder, private router: Router) {
  // You would use FormBuilder and Router from @angular/forms and @angular/router
  // For context you may have to import FormBuilder, FormGroup, Validators, Router in module
  this.loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
}

onSubmit() {
  if (this.loginForm.invalid) {
    this.errorMessage = 'Please enter valid email and password.';
    return;
  }
  const { email, password } = this.loginForm.value;

  // In a real app, you would POST to your backend for authentication.
  // Here, just an example & set error if fake login fails

  // Example static login
  if (email === 'employee@company.com' && password === 'password123') {
    this.errorMessage = '';
    // Navigate or emit event for successful login
    this.router.navigate(['/employee/dashboard']);
  } else {
    this.errorMessage = 'Invalid email or password. Please try again.';
  }
}

}
