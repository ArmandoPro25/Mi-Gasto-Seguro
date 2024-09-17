import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-change-password-email',
  templateUrl: './change-password-email.component.html',
  styleUrls: ['./change-password-email.component.css']
})
export class ChangePasswordEmailComponent implements OnInit{
  email: string = '';

  constructor(private userService: UserService, private router: Router, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Cambiar Contraseña');
  }
  sendRecoveryEmail(): void {
    if (this.email) {
      this.userService.checkEmailExists(this.email).subscribe(
        response => {
          if (response.success) {
            console.log('Correo de recuperación enviado', response.message);

            this.router.navigate(['/change-pass-code']);
            localStorage.setItem('emailForVerification', this.email);
            this.userService.sendPasswordRecoveryEmail(this.email).subscribe(
              recoveryResponse => {
                console.log('Correo de recuperación enviado con éxito');
              },
              error => {
                console.error('Error al enviar el correo de recuperación', error);
              }
            );
          } else {
            console.error('El correo no existe en la base de datos', response.message);
          }
        },
        error => {
          console.error('Error al verificar el correo', error);
        }
      );
    } else {
      console.warn('Debes ingresar un correo electrónico válido');
    }
  }
}
