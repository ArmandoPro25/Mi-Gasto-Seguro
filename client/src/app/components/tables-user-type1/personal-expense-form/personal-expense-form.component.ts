import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonalExpensesService } from '../../../services/personal-expenses.service';
import { PersonalExpense } from '../../../models/PersonalExpense';
import { NgForm } from '@angular/forms';

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

  constructor(
    private personalExpensesService: PersonalExpensesService,
    private route: ActivatedRoute,
    private router: Router
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
  
}
