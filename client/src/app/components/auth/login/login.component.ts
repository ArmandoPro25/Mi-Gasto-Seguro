import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: string | null = null;
  passwordFieldType: string = 'password';
  rememberMe: boolean = false;

  constructor(
    private userService: UserService, 
    private router: Router
  ) {}

  ngOnInit() {
    const savedUsername = localStorage.getItem('savedUsername');
    if (savedUsername) {
      const loginForm = document.getElementById('validationTooltipUsername') as HTMLInputElement;
      if (loginForm) {
        loginForm.value = savedUsername;
      }
      this.rememberMe = true;
    }
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  onSubmit(form: any): void {
    this.errorMessage = null;
    const { username, password } = form.value;

    if (!username || !password) {
      this.errorMessage = 'Los campos no pueden estar vacíos';
      return;
    }

    this.userService.authenticate(username, password).subscribe(
      (response: any) => {
        if (response.success) {
          const Type_User = response.Type_User;
          if (this.rememberMe) {
            localStorage.setItem('savedUsername', username);
          } else {
            localStorage.removeItem('savedUsername');
          }
          this.router.navigate([`/home-user-type-${Type_User}`]);
        }
      },
      error => {
        if (error.status === 401) {
          this.errorMessage = 'Usuario o contraseña incorrectos';
        } else {
          this.errorMessage = 'Ocurrió un error al verificar el usuario. Intente nuevamente más tarde.';
        }
      }
    );
  }
}
