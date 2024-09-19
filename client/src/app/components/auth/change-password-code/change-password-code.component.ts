import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Title } from '@angular/platform-browser';
import { ApiResponse } from '../../../interfaces/apiResponse.interface';

@Component({
  selector: 'app-change-password-code',
  templateUrl: './change-password-code.component.html',
  styleUrls: ['./change-password-code.component.css']
})
export class ChangePasswordCodeComponent implements OnInit {
  verificationCode: string = '';
  email: string = '';

  constructor(private userService: UserService, private router: Router, private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Cambiar Contraseña')
    this.email = localStorage.getItem('emailForVerification') || '';
    if (!this.email) {
      console.error('No email found for verification');
    }
  }


  onVerify(): void {
    const code = (document.getElementById('verificationCode') as HTMLInputElement)?.value;

    if (code && this.email) {
      this.userService.verifyEmail(this.email, code).subscribe(
        (response: ApiResponse) => {
          console.log('Email verified', response);
          if (response.success) {
            localStorage.setItem('emailOfUser', this.email);
            this.router.navigate(['/change-pass']);
          } else {
            console.error('Verification failed', response.message);
          }
        },
        error => {
          console.error('Error verifying email', error);
        }
      );
    } else {
      console.warn('Verification code is missing or email is not available');
    }
  }
}