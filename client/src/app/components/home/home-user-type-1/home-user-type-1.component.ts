import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-user-type-1',
  templateUrl: './home-user-type-1.component.html',
  styleUrl: './home-user-type-1.component.css'
})
export class HomeUserType1Component implements OnInit{
  constructor (private titleService: Title) {}
   
  ngOnInit(): void {
    this.titleService.setTitle('Mi Gasto Seguro');
  }
}
