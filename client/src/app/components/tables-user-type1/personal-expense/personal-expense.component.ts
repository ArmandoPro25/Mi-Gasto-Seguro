import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { PersonalExpensesService } from '../../../services/personal-expenses.service';
import { Title } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { PersonalExpense } from '../../../models/PersonalExpense';
import { ActivatedRoute, Router } from '@angular/router';
import { MapboxService } from '../../../services/mapbox.service';

@Component({
  selector: 'app-personal-expense',
  templateUrl: './personal-expense.component.html',
  styleUrls: ['./personal-expense.component.css']
})
export class PersonalExpenseComponent implements OnInit {
  expenseDetails: PersonalExpense | null = null;
  expenseId!: number;
  placeName: string = '';
  placeInfo: any;
  
  constructor(
    private title: Title, 
    private personalExpensesService: PersonalExpensesService, 
    @Inject(PLATFORM_ID) private platformId: Object, 
    private router: Router,
    private mapboxService: MapboxService, 
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Detalle del gasto');

    const expenseId = this.route.snapshot.paramMap.get('id'); // Obtener el ID del gasto desde la URL
    if (expenseId) {
      this.getExpenseDetails(expenseId);
    }
  }

  private getExpenseDetails(expenseId: string): void {
    this.personalExpensesService.getOne(expenseId).subscribe(
      (data: PersonalExpense) => {
        this.expenseDetails = data; // Asignar los detalles del gasto a la variable
      },
      error => {
        console.error('Error al obtener los detalles del gasto', error);
      }
    );
  }

  // Buscar información de un lugar utilizando Mapbox
  searchPlace() {
    if (this.placeName) {
      this.mapboxService.getPlaceInfo(this.placeName).subscribe(
        (response) => {
          if (response.features && response.features.length > 0) {
            this.placeInfo = response.features[0];
            console.log(this.placeInfo);
          } else {
            console.log('No se encontraron resultados');
          }
        },
        (error) => {
          console.error('Error fetching place info:', error);
        }
      );
    }
  }
}
