import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
//import { NavbarModule } from './components/navbar/navbar.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from '../app/auth.guard';
import { TicketstableComponent } from './components/ticketstable/ticketstable.component';
import { EditticketComponent } from './components/editticket/editticket.component';
import { AdduserComponent } from './components/adduser/adduser.component';
import { NewairlineComponent } from './components/newairline/newairline.component';
import { EditairlineComponent } from './components/editairline/editairline.component';
import { AirlineinfoComponent } from './components/airlineinfo/airlineinfo.component';
import { AirlineticketsComponent } from './components/airlinetickets/airlinetickets.component';
import { AddticketComponent } from './components/addticket/addticket.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    TicketstableComponent,
    EditticketComponent,
    AdduserComponent,
    NewairlineComponent,
    EditairlineComponent,
    AirlineinfoComponent,
    AirlineticketsComponent,
    AddticketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    FormsModule
  ],
  providers: [
    AuthGuard,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
