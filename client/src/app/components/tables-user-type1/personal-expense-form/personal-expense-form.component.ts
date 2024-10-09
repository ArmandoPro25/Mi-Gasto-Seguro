import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonalExpensesService } from '../../../services/personal-expenses.service';
import { PersonalExpense } from '../../../models/PersonalExpense';
import { NgForm } from '@angular/forms';
import { MapboxService } from '../../../services/mapbox.service';

@Component({
  selector: 'app-personal-expense-form',
  templateUrl: './personal-expense-form.component.html',
  styleUrls: ['./personal-expense-form.component.css']
})


export class PersonalExpenseFormComponent implements OnInit {
  expense: PersonalExpense = {
    Id_User: '',
    Description_Expense: '',
    Amount_Expense: '',
    Date_Expense: new Date(),
    Place_Expense: '',
    Payment_Method: '',
    Frequency_Expenses: '',
    Id_Category_Personal: 1,
    Notes: '',
    Ticket: ''
  };

  Id_User: string = '';
  typeUser: number = 1;
  placeName: string = '';
  placeInfo: any;

  constructor(
    private personalExpensesService: PersonalExpensesService,
    private route: ActivatedRoute,
    private router: Router,
    private mapboxService: MapboxService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.Id_User = params['Id_User'] || '';
      this.expense.Id_User = this.Id_User;
    });
  }

  submitExpense(form: NgForm): void {
    if (form.valid) {
      this.personalExpensesService.createExpense(this.expense).subscribe(
        (res) => {
          console.log('Gasto creado:', res);
          this.router.navigate([`/home-user-type-${this.typeUser}`], { queryParams: { Id_User: this.Id_User } });
        },
        (err) => {
          console.error('Error al crear el gasto:', err);
        }
      );
    }
  }

  // Buscar información de un lugar utilizando Mapbox
  searchPlace() {
    if (this.placeName) {
      this.mapboxService.getPlaceInfo(this.placeName).subscribe(
        (response) => {
          if (response.features && response.features.length > 0) {
            this.placeInfo = response.features[0];
            console.log(this.placeInfo);
            
            // Obtener el nombre del lugar y la ciudad
            const placeParts = this.placeInfo.place_name.split(',');
            const placeName = placeParts[0].trim(); // "Cinepolis Paseo Dolores"
            const cityName = placeParts.length > 1 ? placeParts[1].trim() : ''; // "Dolores Hidalgo"
            
            // Actualiza Place_Expense con el nombre del lugar y la ciudad
            this.expense.Place_Expense = `${placeName}${cityName ? ', ' + cityName : ''}`; // Solo "Cinepolis Paseo Dolores, Dolores Hidalgo"
  
            console.log('Dirección actualizada:', this.expense.Place_Expense); // Para verificar la actualización
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
