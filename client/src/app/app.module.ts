import { NgModule } from '@angular/core';import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home/home-page/home-page.component';
import { HomeUserType1Component } from './components/home/home-user-type-1/home-user-type-1.component';
import { HomeUserType2Component } from './components/home/home-user-type-2/home-user-type-2.component';
import { LoginComponent } from './components/auth/login/login.component';
import { CreateAccountComponent } from './components/auth/create-account/create-account.component';
import { VerifyEmailComponent } from './components/auth/verify-email/verify-email.component';
import { ChangePasswordEmailComponent } from './components/auth/change-password-email/change-password-email.component';
import { ChangePasswordCodeComponent } from './components/auth/change-password-code/change-password-code.component';
import { ChangePasswordComponent } from './components/auth/change-password/change-password.component';
import { TypeUserComponent } from './components/home/type-user/type-user.component';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { PrivacyPolicyComponent } from './components/docs/privacy-policy/privacy-policy.component';
import { MyAccountComponent } from './components/home/my-account/my-account.component';
import { PersonalIncomeComponent } from './components/tables-user-type1/personal-income/personal-income.component';
import { PersonalReportComponent } from './components/tables-user-type1/personal-report/personal-report.component';
import { BusinessIncomeComponent } from './components/tables-user-type2/business-income/business-income.component';
import { BusinessReportComponent } from './components/tables-user-type2/business-report/business-report.component';
import { WelcomeUserComponent } from './components/home/welcome-user/welcome-user.component';
import { BusinessDepartmentComponent } from './components/tables-user-type2/business-department/business-department.component';
import { PersonalExpenseComponent } from './components/tables-user-type1/personal-expense/personal-expense.component';
import { BusinessExpenseComponent } from './components/tables-user-type2/business-expense/business-expense.component';
import { PersonalExpenseFormComponent } from './components/tables-user-type1/personal-expense-form/personal-expense-form.component';
import { PayForAccess1Component } from './components/init/pay-for-access-1/pay-for-access-1.component';
import { PayForAccess2Component } from './components/init/pay-for-access-2/pay-for-access-2.component';
import { PaypalComponent } from './components/init/paypal/paypal.component';
import { ZoomComponent } from './components/init/zoom/zoom.component';
import { RouterModule,Routes } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HomeUserType1Component,
    HomeUserType2Component,
    LoginComponent,
    CreateAccountComponent,
    VerifyEmailComponent,
    ChangePasswordEmailComponent,
    ChangePasswordCodeComponent,
    ChangePasswordComponent,
    TypeUserComponent,
    PrivacyPolicyComponent,
    MyAccountComponent,
    PersonalIncomeComponent,
    PersonalReportComponent,
    BusinessIncomeComponent,
    BusinessReportComponent,
    WelcomeUserComponent,
    BusinessDepartmentComponent,
    PersonalExpenseComponent,
    BusinessExpenseComponent,
    PersonalExpenseFormComponent,
    PayForAccess1Component,
    PayForAccess2Component,
    PaypalComponent,
    ZoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    CardModule,
    PasswordModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    HttpClient,
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
