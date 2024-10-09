import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { PersonalExpensesService } from '../../../services/personal-expenses.service';

@Component({
  selector: 'app-home-user-type-1',
  templateUrl: './home-user-type-1.component.html',
  styleUrl: './home-user-type-1.component.css'
})
export class HomeUserType1Component implements OnInit{

  expenses: any = [];
  idUser: string | null = null;
  month: string = '';

  constructor (private titleService: Title, private personalExpenseServices: PersonalExpensesService, private router: Router,
  @Inject(PLATFORM_ID) private platformId: Object, 
  ) { this.setCurrentMonth(); }
  
  setCurrentMonth() {
    const date = new Date();
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    this.month = months[date.getMonth()]; // Obtiene el nombre del mes actual
  }

  ngOnInit(): void {
    this.titleService.setTitle('Mi Gasto Seguro');
    
    if (isPlatformBrowser(this.platformId)) {
      this.idUser = localStorage.getItem('IdUser');
      if (this.idUser) {
        this.loadExpenses();
      } else {
        console.error('Usuario no autenticado');
        this.router.navigate(['/login']);
      }
    } else {
      console.warn('No se puede acceder a localStorage en el lado del servidor.');
      this.router.navigate(['/login']);
    }
  }
  
   

  loadExpenses() {
    if (this.idUser) {
      this.personalExpenseServices.getExpenses(this.idUser).subscribe(
        (resp: any) => {
          this.expenses = resp;
        },
        err => console.log(err)
      );
    }
  }

  viewExpenseDetail(id: string) {
    localStorage.setItem('IdExpense', id);
    this.router.navigate(['/personal-expense', id]);
  }
  
}