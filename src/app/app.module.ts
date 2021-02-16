import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faChartBar as farChartbar} from '@fortawesome/free-regular-svg-icons';
import {faBell as fasBell, faUser as fasUser} from '@fortawesome/free-solid-svg-icons';
import {AppRoutingModule} from './app-routing.module';
import {DashboardComponent} from './components/pages/dashboard/dashboard.component';
import {LoginComponent} from './components/pages/login/login.component';
import {HeaderComponent} from './components/shared/header/header.component';
import {SidebarComponent} from './components/shared/sidebar/sidebar.component';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from './components/shared/toast/toast.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    HeaderComponent,
    SidebarComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {

    // Add an icon to the library for convenient access in other components
    library.addIcons(fasBell, farChartbar, fasUser);
  }
}
