import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent implements OnInit {
  constructor(private titleService: Title) {}
   
  ngOnInit(): void {
    this.titleService.setTitle('Cambiar Contraseña');
  }
}
