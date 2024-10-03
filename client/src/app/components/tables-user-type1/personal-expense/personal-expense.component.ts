import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { PersonalExpensesService } from '../../../services/personal-expenses.service';
import { Title } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-expense',
  templateUrl: './personal-expense.component.html',
  styleUrl: './personal-expense.component.css'
})
export class PersonalExpenseComponent implements OnInit {
  idExpense: any = [];
  idUser: string | null = null;
  
  constructor (private title: Title, private personalExpensesService: PersonalExpensesService, 
    @Inject(PLATFORM_ID) private platformId: Object, private router: Router
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Detalle del gasto');
    
    if (isPlatformBrowser(this.platformId)) {
      this.idUser = localStorage.getItem('IdUser');
      if (this.idUser) {
      } else {
        console.error('Usuario no autenticado');
        this.router.navigate(['/login']);
      }
    } else {
      console.warn('No se puede acceder a localStorage en el lado del servidor.');
      this.router.navigate(['/login']);
    }
  }
  
   

}

