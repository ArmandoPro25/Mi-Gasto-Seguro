export interface BusinessExpense {
    Id_User?: string;
    Id_BusinessExpenses?: string;
    Description_Expense?: string;
    Amount_Expense?: string;
    Date_Expense?: Date;
    Place_Expense: string;
    Id_Category_Business?: number;
    CategoryBusiness?: string; 
    Project?: string;
    Frequency_Expenses?: string;
    Taxes?: number;
    Ticket?: string;
}