import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { BusinessExpense } from '../models/BusinessExpense';

@Injectable({
  providedIn: 'root'
})
export class BusinessExpensesService {
  private API_URI = 'http://localhost:3000/api/personal-expense';

  constructor(private http: HttpClient) { }

  getExpenses(idUser: string): Observable<BusinessExpense[]> {
    return this.http.get<{ expenses: BusinessExpense[] }>(`${this.API_URI}/list/${idUser}`).pipe(
      map(response => response.expenses)
    );
  }

  getOne(id: string): Observable<BusinessExpense> {
    return this.http.get<BusinessExpense>(`${this.API_URI}/getExpenseById/${id}`);
  }

  createExpense(expense: BusinessExpense): Observable<any> {
    return this.http.post(`${this.API_URI}/create`, expense);
  }
  
  getExpensesByMonth(idUser: string, month: number, year: number): Observable<BusinessExpense[]> {
    return this.http.get<{ expenses: BusinessExpense[] }>(`${this.API_URI}/list/${idUser}?month=${month}&year=${year}`).pipe(
      map(response => response.expenses)
    );
  }
  
}
