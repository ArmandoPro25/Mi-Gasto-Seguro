import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {

  constructor(private router: Router) { }
  logout(){
    localStorage.removeItem('IdUser');
    this.router.navigateByUrl('/login');
  }
}
