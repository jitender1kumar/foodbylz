import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  employeeForm: any;
  employees: any[] = [];
  addEmployeeMsg: string = '';
  addEmployeeError: string = '';
  deleteEmployeeMsg: string = '';
  deleteEmployeeError: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
    // In real Angular app, you would import FormBuilder from @angular/forms
    // For non-strict typing as in context, you may need to provide FormBuilder using module providers
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    // Just a mock existing employees list
    this.employees = [
      {name: "Alice Brown", email: "alice@company.com", role: "manager"},
      {name: "John Doe", email: "john@company.com", role: "staff"},
    ];
  }

  onAddEmployee() {
    if (this.employeeForm.invalid) {
      this.addEmployeeMsg = '';
      this.addEmployeeError = 'Please fill all fields correctly!';
      return;
    }

    const { name, email, role, password } = this.employeeForm.value;

    // Simulating backend add, would be replaced with API in production
    // Also check if email already exists in list
    if (this.employees.find((emp) => emp.email === email)) {
      this.addEmployeeError = 'An employee with this email already exists.';
      this.addEmployeeMsg = '';
      return;
    }

    this.employees.push({ name, email, role });
    this.addEmployeeMsg = 'Employee added successfully!';
    this.addEmployeeError = '';
    this.employeeForm.reset();
  }

  onDeleteEmployee(emp: any) {
    // In real app, confirmation and backend API
    const idx = this.employees.indexOf(emp);
    if (idx !== -1) {
      this.employees.splice(idx, 1);
      this.deleteEmployeeMsg = "Employee deleted successfully!";
      this.deleteEmployeeError = '';
    } else {
      this.deleteEmployeeMsg = '';
      this.deleteEmployeeError = 'Could not delete employee.';
    }
  }

}
