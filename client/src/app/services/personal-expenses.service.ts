import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { PersonalExpense } from '../models/PersonalExpense';

@Injectable({
  providedIn: 'root'
})
export class PersonalExpensesService {
  private API_URI = 'http://localhost:3000/api/personal-expense';

  constructor(private http: HttpClient) { }

  getExpenses(idUser: string): Observable<PersonalExpense[]> {
    return this.http.get<{ expenses: PersonalExpense[] }>(`${this.API_URI}/list/${idUser}`).pipe(
      map(response => response.expenses)
    );
  }

  getOne(id: string): Observable<PersonalExpense> {
    return this.http.get<PersonalExpense>(`${this.API_URI}/getExpenseById/${id}`);
  }

  createExpense(expense: PersonalExpense): Observable<any> {
    return this.http.post(`${this.API_URI}/create`, expense);
  }
  
}
