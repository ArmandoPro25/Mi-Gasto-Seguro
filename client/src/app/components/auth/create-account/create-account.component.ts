import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ApiResponse } from '../../../interfaces/apiResponse.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
  constructor(private userService: UserService, private router: Router) { }

  errorMessages: { [key: string]: string } = {};

  
  onRegister(form: NgForm): void {
    if (form.valid) {
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
