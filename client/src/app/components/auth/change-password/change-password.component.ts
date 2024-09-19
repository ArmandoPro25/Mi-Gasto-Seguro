import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  newPass: string = '';
  confirmPassword: string = '';
  email: string = '';
  errorMessages: { [key: string]: string } = {}; // Para guardar los mensajes de error

  constructor(private userService: UserService, private router: Router, private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Cambiar Contraseña');
    this.email = localStorage.getItem('emailOfUser') || '';
    if (!this.email) {
      console.error('No email found for verification');
    }
  }

  validateForm(): boolean {
    this.errorMessages = {};

    // Validar nueva contraseña
    if (!this.isValidPassword(this.newPass)) {
      this.errorMessages['Contrasena'] = 'Tu contraseña debe tener de 8-20 caracteres, contener letras y números y al menos un carácter especial, sin espacios.';
    }

    // Validar que las contraseñas coincidan
    if (this.newPass !== this.confirmPassword) {
      this.errorMessages['ConfirmarContrasena'] = 'Las contraseñas no coinciden';
    }

    // Retornar true si no hay errores
    return Object.keys(this.errorMessages).length === 0;
  }

  isValidPassword(password: string): boolean {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,20}$/;
    return regex.test(password);
  }

  onSubmit(): void {
    // Validar el formulario antes de intentar cambiar la contraseña
    if (this.validateForm()) {
      // Si no hay errores, proceder a cambiar la contraseña
      this.userService.updatePassword(this.email, this.newPass).subscribe(
        (response) => {
          if (response.success) {
            alert('Contraseña actualizada correctamente');
            this.router.navigate(['/login']);
          } else {
            alert('Error al actualizar la contraseña');
          }
        },
        (error) => {
          console.error('Error:', error);
          alert('Ocurrió un error al actualizar la contraseña');
        }
      );
    }
  }
}
