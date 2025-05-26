import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ CommonModule, ReactiveFormsModule, FormsModule, RouterModule ],
  templateUrl: './register.component.html',
    standalone: true,
  styleUrl: './register.component.css'
})
export class RegisterComponent  implements OnInit{
   registerForm!: FormGroup;

  constructor(private fb: FormBuilder) {}


  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.(com)$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{8,}$/)
      ]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.matchPasswords
    });
  }

  matchPasswords(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  get f() {
    return this.registerForm.controls;
  }

  onRegister() {
    if (this.registerForm.valid) {
      console.log('Register Data:', this.registerForm.value);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}