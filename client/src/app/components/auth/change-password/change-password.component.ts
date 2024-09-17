import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  newPassword: string = '';
  confirmPassword: string = '';
  email: string = '';

  constructor(private userService: UserService, private router: Router, private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Cambiar Contraseña');
    this.email = localStorage.getItem('emailOfUser') || '';
    if (!this.email) {
      console.error('No email found for verification');
    }
  }

  onSubmit(): void {
    if (this.newPassword !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (this.email && this.newPassword) {
      this.userService.updatePassword(this.email, this.newPassword).subscribe(
        response => {
            console.log('Response from server:', response);
            if (response.success) {
                alert('Contraseña actualizada exitosamente');
                this.router.navigate(['/login']);
            } else {
                alert('No se pudo actualizar la contraseña');
            }
        },
        error => {
            console.error('Error al actualizar la contraseña', error);
            alert('Ocurrió un error. Por favor, intenta de nuevo.');
        }
    );    
      }
  }
}
