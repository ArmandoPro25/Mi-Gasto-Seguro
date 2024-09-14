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
    PrivacyPolicyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    CardModule,
    PasswordModule,
    FormsModule
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
