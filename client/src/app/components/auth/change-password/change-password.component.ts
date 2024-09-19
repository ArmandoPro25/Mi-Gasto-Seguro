import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ApiResponse } from '../../../interfaces/apiResponse.interface';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  newPass: string = '';
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
    if (this.newPass !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
  
    if (this.newPass.length < 8) {
      alert('La contraseña debe tener al menos 8 caracteres');
      return;
    }
  
    this.userService.updatePassword(this.email, this.newPass).subscribe(
      (response: ApiResponse) => {
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
