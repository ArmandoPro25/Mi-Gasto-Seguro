import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ApiResponse } from '../../../interfaces/apiResponse.interface';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  errorMessages: { [key: string]: string } = {};

  constructor(private userService: UserService, private router: Router, private titleServivce: Title) { }

  ngOnInit(): void {
      this.titleServivce.setTitle('Crear Cuenta')
  }
  validateForm(form: NgForm): boolean {
    this.errorMessages = {};
  
    const username = form.value.username;
    const email = form.value.email;
    const password = form.value.password;
  
    console.log('Validating password:', password);
  
    if (!username) {
      this.errorMessages['Usuario'] = 'El campo no debe estar vacío';
    }
  
    if (!email) {
      this.errorMessages['Correo'] = 'El campo no debe estar vacío';
    }
  
    if (username.length > 20) {
        this.errorMessages['Usuario'] = 'El usuario debe de contener menos de 20 caracteres';
    }
  
    if (/\s/.test(username)) {
      this.errorMessages['Usuario'] = 'El nombre de usuario no debe llevar espacios';
    }
  
    if (username && username.length < 5) {
      if (username.length > 1) {
        this.errorMessages['Usuario'] = 'El nombre de usuario es muy corto.';
      }
    }
  
    if (!this.isValidEmail(email)) {
        this.errorMessages['Correo'] = 'Ingresar un correo electrónico válido';
    }
  
    if (password && !this.isValidPassword(password)) {
      console.log('Invalid password:', password);
      this.errorMessages['Contrasena'] = 'Tu contraseña debe tener de 8-20 carácteres, contener letras y números y al menos un carácter especial, sin espacios.';
    }
  
    if (!form.value.privacyPolicy) {
      this.errorMessages['Politica'] = 'Debes aceptar la política de privacidad';
    }
  
    return Object.keys(this.errorMessages).length === 0;
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidPassword(password: string): boolean {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,20}$/;
    return regex.test(password);
  }
  
  

  onRegister(form: NgForm): void {
    if (this.validateForm(form)) {
      const user = {
        Name_User: form.value.username,
        Email_User: form.value.email,
        Password_User: form.value.password,
        Type_User: 1 // O el tipo de usuario que desees
      };
      this.userService.register(user).subscribe(
        (response: ApiResponse) => {
          console.log('User registered', response);
          // Guardar el correo en localStorage para usarlo luego en la verificación
          localStorage.setItem('emailForVerification', user.Email_User);
          this.router.navigate(['/verify-email']); // Redirige a la página de verificación de correo electrónico
        },
        error => {
          console.error('Error registering user', error);
        }
      );
    }
  }
}
