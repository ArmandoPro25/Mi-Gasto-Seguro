import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ApiResponse } from '../../../interfaces/apiResponse.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
  email: string = ''; // Variable para almacenar el email

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    // Obtener el email del localStorage cuando el componente se inicializa
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
            // Almacenar el Id_User y Type_User en el localStorage
            localStorage.setItem('Id_User', response.Id_User || '');
            localStorage.setItem('Type_User', response.Type_User || '');

            // Redirigir a la página de tipo de usuario
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
