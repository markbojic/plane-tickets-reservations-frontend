import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from 'src/app/auth.guard';
import { EditticketComponent } from './components/editticket/editticket.component';
import { AirlineinfoComponent } from './components/airlineinfo/airlineinfo.component';

const routes: Routes = [
  // http://localhost:4200
  { path: '', component: HomeComponent, canActivate: [AuthGuard]},
  // http://localhost:4200/login
  { path: 'login', component: LoginComponent},
  // http://localhost:4200/ticket/edit/id
  { path: 'ticket/edit/:id', component: EditticketComponent, canActivate: [AuthGuard]},
  // http://localhost:4200/airline/id
  { path: 'airline/:id', component: AirlineinfoComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
