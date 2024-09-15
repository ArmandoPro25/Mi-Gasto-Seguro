import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-user-type-2',
  templateUrl: './home-user-type-2.component.html',
  styleUrl: './home-user-type-2.component.css'
})
export class HomeUserType2Component {
  constructor (private titleService: Title) {}
   
  ngOnInit(): void {
    this.titleService.setTitle('Mi Gasto Seguro');
  }
}
