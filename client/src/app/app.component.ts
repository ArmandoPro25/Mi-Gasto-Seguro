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
  public enviarmouse(btn: any) {
    console.log("Se detectó movimiento del mouse");

    this.actividad.set(true);
  }

  constructor(private inject: Injector, private router: Router) {} 

  ngOnInit(): void {
    this.metodoinactividad();
  }

  private metodoinactividad() {
    effect(() => {
      console.log("La actividad cambia", this.actividad());

      if (this.actividad()) {
        console.log("Se detecta actividad del usuario");

        if (this.time) {
          clearTimeout(this.time);
        }

        this.time = setTimeout(() => {
          alert("Se redirigirá a la ventana de inicio de sesión por inactividad");
          this.router.navigate(['/login']); 
        }, 10000);

        untracked(() => {
          this.actividad.set(false);
        });
      }
    }, { injector: this.inject });
  }
}
