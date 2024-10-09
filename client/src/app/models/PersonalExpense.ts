export interface PersonalExpense {
    Id_User?: string;
    Id_PersonalExpenses?: string;
    Description_Expense?: string;
    Amount_Expense?: string;
    Date_Expense?: Date;
    Place_Expense: string;
    Payment_Method?: string;
    Frequency_Expenses?: string;
    Id_Category_Personal?: number;
    Notes?: string;
    Ticket?: string;
}
