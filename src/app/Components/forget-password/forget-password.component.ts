import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule ,CommonModule,RouterModule  ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent implements OnInit{

forgetForm!: FormGroup;

  constructor(private fb: FormBuilder,private router:Router) {}

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
       Swal.fire({
      icon: 'success',
      title: 'Email Sent!',
      text: 'Check your email to reset your password.',
      confirmButtonText: 'OK'
    }).then(() => {
      this.router.navigate(['/reset-password']);
    });
      
    } else {
      this.forgetForm.markAllAsTouched();
    }
  }
}
