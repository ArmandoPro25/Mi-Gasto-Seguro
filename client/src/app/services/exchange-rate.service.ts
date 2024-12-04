import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {
  private apiUrl = 'https://v6.exchangerate-api.com/v6/28f75a252c31d0f17218b7f5/latest/';

  constructor(private http: HttpClient) {}

  getExchangeRates(baseCurrency: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${baseCurrency}`);
  }
}
