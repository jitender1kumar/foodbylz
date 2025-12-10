import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-companylogin',
  standalone: false,
  templateUrl: './companylogin.component.html',
  styleUrl: './companylogin.component.css'
})
export class CompanyloginComponent {
loginForm: any;
errorMessage: string = "";



@Output() redirectToTables: EventEmitter<string> = new EventEmitter<string>();



constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    // Explicitly import Validators
    // This import must be placed at the top of your file:
    // import { Validators } from '@angular/forms';
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

onSubmit() {
  if (this.loginForm.invalid) {
    this.errorMessage = "Please fill the form correctly.";
    return;
  }

  const { email, password } = this.loginForm.value;

  // Dummy authentication logic (replace with real API call)
  // You can inject and use a CompanyAuthService here for a real backend.
  if (email === "company@example.com" && password === "password123") {
    this.errorMessage = "";
    this.redirectToTables.emit("tables");
    // Success: Navigate to dashboard or protected area
   // this.router.navigate(['/tables']);
    // this.router.navigate(['/table']);
  } else {
    this.errorMessage = "Invalid email or password.";
  }
}

}
