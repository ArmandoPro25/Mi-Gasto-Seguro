import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './components/auth/change-password/change-password.component';
import { ChangePasswordCodeComponent } from './components/auth/change-password-code/change-password-code.component';
import { ChangePasswordEmailComponent } from './components/auth/change-password-email/change-password-email.component';
import { CreateAccountComponent } from './components/auth/create-account/create-account.component';
import { LoginComponent } from './components/auth/login/login.component';
import { VerifyEmailComponent } from './components/auth/verify-email/verify-email.component';
import { HomePageComponent } from './components/home/home-page/home-page.component';
import { HomeUserType1Component } from './components/home/home-user-type-1/home-user-type-1.component';
import { HomeUserType2Component } from './components/home/home-user-type-2/home-user-type-2.component';
import { TypeUserComponent } from './components/home/type-user/type-user.component';
import { PrivacyPolicyComponent } from './components/docs/privacy-policy/privacy-policy.component';
import { PersonalIncomeComponent } from './components/tables-user-type1/personal-income/personal-income.component';
import { PersonalReportComponent } from './components/tables-user-type1/personal-report/personal-report.component';
import { BusinessIncomeComponent } from './components/tables-user-type2/business-income/business-income.component';
import { BusinessReportComponent } from './components/tables-user-type2/business-report/business-report.component';
import { MyAccountComponent } from './components/home/my-account/my-account.component';
import { WelcomeUserComponent } from './components/home/welcome-user/welcome-user.component';
import { PersonalIncomeFromComponent } from './components/tables-user-type1/personal-income-from/personal-income-from.component';
import { PersonalExpenseFromComponent } from './components/tables-user-type1/personal-expense-from/personal-expense-from.component';
import { BusinessIncomeFromComponent } from './components/tables-user-type2/business-income-from/business-income-from.component';
import { BusinessExpenseFromComponent } from './components/tables-user-type2/business-expense-from/business-expense-from.component';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent }, 
  { path: 'change-pass', component: ChangePasswordComponent },
  { path: 'change-pass-code', component: ChangePasswordCodeComponent },
  { path: 'change-pass-email', component: ChangePasswordEmailComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'login', component: LoginComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'home-user-type-1', component: HomeUserType1Component },
  { path: 'home-user-type-2', component: HomeUserType2Component },
  { path: 'type-user', component: TypeUserComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'personal-income', component: PersonalIncomeComponent },
  { path: 'personal-report', component: PersonalReportComponent },
  { path: 'business-income', component: BusinessIncomeComponent },
  { path: 'business-report', component: BusinessReportComponent },
  { path: 'my-account', component: MyAccountComponent },
  { path: 'welcome-user', component: WelcomeUserComponent },
  { path: 'personal-income-form', component: PersonalIncomeFromComponent },
  { path: 'personal-expense-form', component: PersonalExpenseFromComponent },
  { path: 'business-income-form', component: BusinessIncomeFromComponent },
  { path: 'business-expense-form', component: BusinessExpenseFromComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
