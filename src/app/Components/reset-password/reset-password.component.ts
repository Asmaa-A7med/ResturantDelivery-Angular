import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
resetForm: FormGroup;

  

  constructor(private fb: FormBuilder, private router: Router) {
    this.resetForm = this.fb.group({
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/)
      ]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.matchPasswords });
  }

  get f() {
    return this.resetForm.controls;
  }

  matchPasswords(group: FormGroup) {
    const passwordControl = group.get('password');
    const confirmControl = group.get('confirmPassword');

    if (!passwordControl || !confirmControl) return null;

    const password = passwordControl.value;
    const confirm = confirmControl.value;

    if (password !== confirm) {
      confirmControl.setErrors({ mismatch: true });
    } else {
      confirmControl.setErrors(null);
    }

    return null;
  }

  onResetPassword() {
    if (this.resetForm.invalid) return;

    Swal.fire({
      icon: 'success',
      title: 'Password Reset',
      text: 'Your password has been reset successfully. You can now log in with your new password.',
      confirmButtonText: 'OK'
    }).then(() => {
      this.router.navigate(['/login']);
    });
  }
}