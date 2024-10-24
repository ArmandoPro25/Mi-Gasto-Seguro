import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-pay-for-access-1',
  templateUrl: './pay-for-access-1.component.html',
  styleUrls: ['./pay-for-access-1.component.css']
})

export class PayForAccess1Component implements OnInit {

  idUser: string | null = null;

  constructor(
    private userService: UserService,
    private router: Router,
    private titleService: Title,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.loadPayPalScript();
    this.titleService.setTitle('Acceder a Mi Gasto Seguro');

    if (isPlatformBrowser(this.platformId)) {
      this.idUser = localStorage.getItem('IdUser');
      if (!this.idUser) {
        console.error('Usuario no autenticado');
        this.router.navigate(['/login']);
      }
    } else {
      console.warn('No se puede acceder a localStorage en el lado del servidor.');
      this.router.navigate(['/login']);
    }
  }
  
  formatCardNumber(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\s+/g, '');
    value = value.replace(/[^0-9]/gi, '');

    const formattedValue = value.match(/.{1,4}/g)?.join(' ') || '';
    input.value = formattedValue;
  }

  welcomeUser(): void {
    if (this.idUser) {
      this.userService.getUserType(this.idUser).subscribe(
        (response: any) => {
          if (response.success) {
            this.router.navigate([`/welcome-user`], { queryParams: { Id_User: this.idUser } });
          } else {
            console.error('No se pudo obtener el tipo de usuario');
          }
        },
        error => {
          console.error('Error al obtener el tipo de usuario', error);
        }
      );
    } else {
      console.error('No user ID found');
    }
  }

  loadPayPalScript() {
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=AUlbK4mKpNVWGd7hromw3H9c-DrroWugIAzT9mimgNOli39YPozvYX811v-w6SjvGQd97H8yVgbks23L`;
    script.onload = () => this.initPayPalButtons();
    document.body.appendChild(script);
  }

  initPayPalButtons() {
    (window as any).paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: '10.00' // Cambia este valor según sea necesario
            }
          }]
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          alert('Transaction completed by ' + details.payer.name.given_name);
          this.router.navigate([`/welcome-user`], { queryParams: { Id_User: this.idUser } });
        });
      },
      onError: (err: any) => {
        console.error('Error durante el procesamiento del pago', err);
      }
    }).render('#paypal-button-container');
  }
}
