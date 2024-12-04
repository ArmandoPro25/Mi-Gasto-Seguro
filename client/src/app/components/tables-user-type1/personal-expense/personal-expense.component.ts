import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { PersonalExpensesService } from '../../../services/personal-expenses.service';
import { Title } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { PersonalExpense } from '../../../models/PersonalExpense';
import { ActivatedRoute, Router } from '@angular/router';
import { MapboxService } from '../../../services/mapbox.service';
import { ExchangeRateService } from '../../../services/exchange-rate.service';


@Component({
  selector: 'app-personal-expense',
  templateUrl: './personal-expense.component.html',
  styleUrls: ['./personal-expense.component.css']
})


export class PersonalExpenseComponent implements OnInit {
  exchangeRates: { [key: string]: number } | null = null;
  baseCurrency: string = 'USD';
  expenseDetails: PersonalExpense | null = null;
  expenseId!: number;
  placeInfo: any;
  placeImageUrl: string | null = null;

  constructor(
    private title: Title, 
    private personalExpensesService: PersonalExpensesService, 
    private mapboxService: MapboxService,
    @Inject(PLATFORM_ID) private platformId: Object, 
    private router: Router,
    private route: ActivatedRoute,
    private exchangeRateService: ExchangeRateService,
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Detalle del gasto');
    const expenseId = this.route.snapshot.paramMap.get('id');
    if (expenseId) {
      this.getExpenseDetails(expenseId);
    }
    if (isPlatformBrowser(this.platformId)) {
      this.loadGoogleMapsScript();
    }
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
  
  private loadGoogleMapsScript(): void {
    if (isPlatformBrowser(this.platformId)) {
      const existingScript = document.getElementById('googleMapsScript');
      if (!existingScript) {
        const script = document.createElement('script');
        script.id = 'googleMapsScript';
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBDaeWicvigtP9xPv919E-RNoxfvC-Hqik`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
          if (this.placeInfo?.center) {
            const [lng, lat] = this.placeInfo.center;
            this.iniciarMap({ lat, lng });
          }
        };
        document.body.appendChild(script);
      }
    }
  }
  
  iniciarMap(coord: { lat: number; lng: number }): void {
    if (isPlatformBrowser(this.platformId)) {
      const mapElement = document.getElementById('map');
      
      if (mapElement) {
        const map = new google.maps.Map(mapElement as HTMLElement, {
          zoom: 10,
          center: coord
        });
    
        new google.maps.Marker({
          position: coord,
          map: map
        });
      } else {
        console.error('El elemento con ID "map" no se encontró en el DOM.');
      }
    }
  }
  
  private getExpenseDetails(expenseId: string): void {
    this.personalExpensesService.getOne(expenseId).subscribe(
      (data: PersonalExpense) => {
        this.expenseDetails = data;
        this.getImage(this.expenseDetails.Place_Expense);
        this.getPlaceInfo(this.expenseDetails.Place_Expense);
      },
      error => {
        console.error('Error al obtener los detalles del gasto', error);
      }
    );
  }

  private getImage(placeName: string): void {
    this.mapboxService.searchImage(placeName).subscribe(
      (response) => {
        if (response.items && response.items.length > 0) {
          this.placeImageUrl = response.items[0].link;
          console.log('Imagen del lugar:', this.placeImageUrl);
        }
      },
      (error) => {
        console.error('Error al buscar la imagen:', error);
      }
    );
  }

  private getPlaceInfo(placeName: string): void {
    this.mapboxService.getPlaceInfo(placeName).subscribe(
      (response) => {
        if (response.features && response.features.length > 0) {
          this.placeInfo = response.features[0];
          const [lng, lat] = this.placeInfo.center;
          console.log('Coordenadas:', { lat, lng });
          if (isPlatformBrowser(this.platformId)) {
            this.iniciarMap({ lat, lng });
          }
        }
      },
      (error) => {
        console.error('Error al obtener la información del lugar:', error);
      }
    );
  }
}
