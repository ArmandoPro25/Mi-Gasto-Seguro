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

  constructor(
    private userService: UserService, 
    private router: Router
  ) {}

  ngOnInit() {}

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
          this.router.navigate(['/home-user-type-1']);
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
