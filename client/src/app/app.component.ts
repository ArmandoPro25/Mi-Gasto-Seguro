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

  @HostListener('mousemove', ['$event'])
  @HostListener('keydown', ['$event'])
  public resetInactividad() {
    this.actividad.set(true);
    this.resetTimer();
  }

  constructor(private inject: Injector, private router: Router) {} 

  ngOnInit(): void {
    this.metodoinactividad();
  }

  private resetTimer() {
    if (this.time) {
      clearTimeout(this.time);
    }
    this.time = setTimeout(() => {
      const currentRoute = this.router.url;
      if (currentRoute !== '/login' && currentRoute !== '/create-account') {
        alert("Se redirigirá a la ventana de inicio de sesión por inactividad");
        this.router.navigate(['/login']);
      }
    }, 10000);
  }

  private metodoinactividad() {
    effect(() => {
      const currentRoute = this.router.url;
      if (currentRoute === '/login' || currentRoute === '/create-account'||currentRoute ==='/home') {
        if (this.time) {
          clearTimeout(this.time);
        }
        return;
      }
      this.resetTimer();
    }, { injector: this.inject });
  }
}

