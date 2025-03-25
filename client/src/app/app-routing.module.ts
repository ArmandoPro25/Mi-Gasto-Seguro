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
import { PersonalIncomeFromComponent } from './components/tables-user-type1/personal-income-from/personal-income-from.component';
import { MyAccountComponent } from './components/home/my-account/my-account.component';
import { WelcomeUserComponent } from './components/home/welcome-user/welcome-user.component';
import { BusinessDepartmentComponent } from './components/tables-user-type2/business-department/business-department.component';
import { PersonalExpenseComponent } from './components/tables-user-type1/personal-expense/personal-expense.component';
import { BusinessExpenseComponent } from './components/tables-user-type2/business-expense/business-expense.component';
import { PersonalExpenseFormComponent } from './components/tables-user-type1/personal-expense-form/personal-expense-form.component';
import { BusinessIncomeFormComponent } from './components/tables-user-type2/business-income-form/business-income-form.component';
import { PayForAccess1Component } from './components/init/pay-for-access-1/pay-for-access-1.component';
import { PayForAccess2Component } from './components/init/pay-for-access-2/pay-for-access-2.component';
import { PaypalComponent } from './components/init/paypal/paypal.component';
import { ZoomComponent } from './components/init/zoom/zoom.component';
import { ExchangeRatesComponent } from './components/exchange-rates/exchange-rates.component';
import { AuthGuard } from './guards/auth.guard';
import { AboutUsComponent } from './components/docs/about-us/about-us.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent }, 
  { path: 'change-pass', component: ChangePasswordComponent },
  { path: 'change-pass-code', component: ChangePasswordCodeComponent },
  { path: 'change-pass-email', component: ChangePasswordEmailComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'login', component: LoginComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'home-user-type-1', component: HomeUserType1Component, canActivate: [AuthGuard] },
  { path: 'home-user-type-2', component: HomeUserType2Component, canActivate: [AuthGuard] },
  { path: 'type-user', component: TypeUserComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'personal-income', component: PersonalIncomeComponent, canActivate: [AuthGuard] },
  { path: 'personal-report', component: PersonalReportComponent, canActivate: [AuthGuard] },
  { path: 'business-income', component: BusinessIncomeComponent, canActivate: [AuthGuard] },
  { path: 'business-report', component: BusinessReportComponent, canActivate: [AuthGuard] },
  { path: 'my-account', component: MyAccountComponent, canActivate: [AuthGuard] },
  { path: 'welcome-user', component: WelcomeUserComponent },
  { path: 'personal-income-from', component: PersonalIncomeFromComponent, canActivate: [AuthGuard] },
  { path: 'business-income-form', component: BusinessIncomeFormComponent, canActivate: [AuthGuard] },
  { path: 'business-department', component: BusinessDepartmentComponent, canActivate: [AuthGuard] },
  { path: 'personal-expense/:id', component: PersonalExpenseComponent, canActivate: [AuthGuard] },
  { path: 'business-expense', component: BusinessExpenseComponent, canActivate: [AuthGuard] },
  { path: 'personal-expense-form', component: PersonalExpenseFormComponent, canActivate: [AuthGuard] },
  { path: 'pay-for-access-1', component: PayForAccess1Component },
  { path: 'pay-for-access-2', component: PayForAccess2Component },
  { path: 'paypal', component: PaypalComponent },
  { path: 'zoom', component: ZoomComponent, canActivate: [AuthGuard] },
  { path: 'exchange-rates', component: ExchangeRatesComponent },
  { path: 'about-us', component: AboutUsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
