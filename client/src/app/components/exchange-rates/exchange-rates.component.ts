import { Component, OnInit } from '@angular/core';
import { ExchangeRateService } from '../../services/exchange-rate.service';

@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.component.html',
  styleUrls: ['./exchange-rates.component.css']
})
export class ExchangeRatesComponent implements OnInit {
  exchangeRates: { [key: string]: number } | null = null;
  baseCurrency: string = 'USD';

  constructor(private exchangeRateService: ExchangeRateService) {}

  ngOnInit(): void {
    this.loadExchangeRates();
  }

  private loadExchangeRates(): void {
    this.exchangeRateService.getExchangeRates(this.baseCurrency).subscribe({
      next: (data) => {
        this.exchangeRates = data.conversion_rates;
      },
      error: (error) => {
        console.error('Error al cargar tasas de cambio:', error);
      },
    });
  }
}
