import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ApiResponse } from '../../../interfaces/apiResponse.interface';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
  email: string = ''; 

  constructor(private userService: UserService, private router: Router, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Verificar Email')
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
            localStorage.setItem('Id_User', response.Id_User || '');
            localStorage.setItem('Type_User', response.Type_User || '');

            this.router.navigate(['/type-user']);
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
