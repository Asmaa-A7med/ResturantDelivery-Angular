import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule,CommonModule,RouterModule  ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent implements OnInit{

forgetForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.forgetForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.(com)$/)
      ]]
    });
  }

  get f() {
    return this.forgetForm.controls;
  }

  onSendEmail() {
    if (this.forgetForm.valid) {
      console.log('Sending email to:', this.forgetForm.value.email);
      
    } else {
      this.forgetForm.markAllAsTouched();
    }
  }
}
