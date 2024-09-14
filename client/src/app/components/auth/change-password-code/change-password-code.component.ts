import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-change-password-code',
  templateUrl: './change-password-code.component.html',
  styleUrls: ['./change-password-code.component.css']
})
export class ChangePasswordCodeComponent implements OnInit {
  verificationCode: string = '';
  email: string | null = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.email = localStorage.getItem('userEmail');
    }
  }

  onSubmit() {
    console.log('Verifying email and code', this.email, this.verificationCode);
    if (this.email && this.verificationCode) {
      this.userService.verifyRecoveryCode(this.email, this.verificationCode).subscribe(
        response => {
          console.log('Server response:', response);
          if (response.success) {
            this.router.navigate(['/change-pass']);
          } else {
            alert('Código de verificación inválido');
          }
        },
        error => {
          console.error('Error al verificar el código', error);
          alert('Ocurrió un error. Por favor, intenta de nuevo.');
        }
      );
    }
  }
}
