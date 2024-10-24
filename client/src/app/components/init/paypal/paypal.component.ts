// paypal.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.loadPayPalScript();
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
              value: '10.00'
            }
          }]
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          alert('Transaction completed by ' + details.payer.name.given_name);
        });
      }
    }).render('#paypal-button-container');
  }
}
