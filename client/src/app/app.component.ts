import { Component, effect, HostListener, Injector, OnInit, signal, untracked } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'client';

  public actividad = signal(true);
  private time: any;


  constructor(private inject: Injector, private router: Router) {} 

  ngOnInit(): void {
  }

}
