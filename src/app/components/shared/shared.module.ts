import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PrimeModule } from '../../prime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { IssuerModule } from '../issuer/issuer.module';
import { ReviewerModule } from '../reviewer/reviewer.module';
import { AdminModule } from '../admin/admin.module';
import { ChatBotComponent } from './chat-bot/chat-bot.component';
import Amplify, { Interactions } from 'aws-amplify';
import { SettingsComponent } from './settings/settings.component';

Amplify.configure({
  Auth: {
    identityPoolId: 'us-east-1:f28c9c2d-18c3-47a2-9708-f54528aacd20',
    region: 'us-east-1',
  },
  Interactions: {
    bots: {
      CBI_Test_Nonp: {
        name: 'CBI_Test_Nonp',
        alias: '$LATEST',
        region: 'us-east-1',
      },
    },
  },
});

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    LoginPageComponent,
    RegistrationComponent,
    DashboardPageComponent,
    ChatBotComponent,
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    PrimeModule,
    FormsModule,
    ReactiveFormsModule,
    IssuerModule,
    ReviewerModule,
    AdminModule,
  ],
  exports: [HeaderComponent, SidebarComponent, ChatBotComponent],
})
export class SharedModule {}
