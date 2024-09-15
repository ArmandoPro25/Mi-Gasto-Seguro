import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-type-user',
  templateUrl: './type-user.component.html',
  styleUrls: ['./type-user.component.css']
})
export class TypeUserComponent implements OnInit {

  Id_User: string = '';

  constructor(private router: Router, private userService: UserService, private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Tipo de Usuario');
    this.Id_User = localStorage.getItem('Id_User') || '';
    if (!this.Id_User) {
      console.error('No user ID found');
      this.router.navigate(['/login']);
    }
  }

  onPersonalExpenses(): void {
    this.router.navigate(['/home-user-type-1'], { queryParams: { Id_User: this.Id_User } });
  }

  onCompanyExpenses(): void {
    if (this.Id_User) {
      this.userService.updateTypeUser(this.Id_User, 2).subscribe(
        (response) => {
          console.log('User type updated', response);
          this.router.navigate(['/home-user-type-2'], { queryParams: { Id_User: this.Id_User } });
        },
        error => {
          console.error('Error updating user type', error);
        }
      );
    }
  }
}
