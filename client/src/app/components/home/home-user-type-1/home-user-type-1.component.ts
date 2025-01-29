import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { PersonalExpensesService } from '../../../services/personal-expenses.service';

@Component({
  selector: 'app-home-user-type-1',
  templateUrl: './home-user-type-1.component.html',
  styleUrls: ['./home-user-type-1.component.css']
})
export class HomeUserType1Component implements OnInit {

  expenses: any = [];
  idUser: string | null = null;
  month: string = '';
  currentMonth: number = 0;
  currentYear: number = 0;

  constructor(
    private titleService: Title,
    private personalExpenseServices: PersonalExpensesService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { 
    this.setCurrentMonth();
  }

  setCurrentMonth() {
    const date = new Date();
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    this.currentMonth = date.getMonth() + 1; // Enero es 0
    this.currentYear = date.getFullYear();
    this.month = months[date.getMonth()];
  }

  ngOnInit(): void {
    this.titleService.setTitle('Mi Gasto Seguro');

    if (isPlatformBrowser(this.platformId)) {
      this.idUser = localStorage.getItem('IdUser');
      if (this.idUser) {
        this.loadExpenses(this.currentMonth, this.currentYear);
      } else {
        console.error('Usuario no autenticado');
        this.router.navigate(['/login']);
      }
    } else {
      console.warn('No se puede acceder a localStorage en el lado del servidor.');
      this.router.navigate(['/login']);
    }
  }

  loadExpenses(month: number, year: number) {
    if (this.idUser) {
      this.personalExpenseServices.getExpensesByMonth(this.idUser, month, year).subscribe(
        (resp: any) => {
          this.expenses = resp;
        },
        err => console.log(err)
      );
    }
  }

  loadPreviousMonthExpenses() {
    if (this.currentMonth === 1) {
      this.currentMonth = 12;
      this.currentYear -= 1;
    } else {
      this.currentMonth -= 1;
    }
    this.updateMonthLabel();
    this.loadExpenses(this.currentMonth, this.currentYear);
  }

  loadCurrentMonthExpenses() {
    const date = new Date();
    this.currentMonth = date.getMonth() + 1;
    this.currentYear = date.getFullYear();
    this.updateMonthLabel();
    this.loadExpenses(this.currentMonth, this.currentYear);
  }

  updateMonthLabel() {
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    this.month = months[this.currentMonth - 1];
  }

  viewExpenseDetail(id: string) {
    localStorage.setItem('IdExpense', id);
    this.router.navigate(['/personal-expense', id]);
  }

  createNewExpense() {
    if (this.idUser) {
      this.router.navigate(['/personal-expense-form'], { queryParams: { Id_User: this.idUser } });
    } else {
      console.error('Usuario no autenticado');
    }
  }

  logout(){
    localStorage.removeItem('IdUser');
    this.router.navigateByUrl('/login');
  }
}
