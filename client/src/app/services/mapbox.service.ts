import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapboxService {
  private apiUrl: string = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
  private accessToken: string = 'pk.eyJ1IjoiYXJtYW5kbzI0OThxIiwiYSI6ImNtMXpzOTBuazBiMzgycnB0cHR1MTloOHEifQ.iYyG3Y31UOqf-1Z9g2qVlA'; // Coloca tu Access Token aquí

  constructor(private http: HttpClient) {}

  // Método para obtener la información de un lugar
  getPlaceInfo(placeName: string): Observable<any> {
    const url = `${this.apiUrl}${encodeURIComponent(placeName)}.json`;
    let params = new HttpParams()
      .set('access_token', this.accessToken)
      .set('limit', '1'); // Limitar a un solo resultado relevante

    return this.http.get(url, { params });
  }
}
