import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component'
import { HomeComponent } from './components/home/home.component'
import { AuthGuard } from 'src/app/auth.guard'

const routes: Routes = [
  // http://localhost:4200
  { path: '', component: HomeComponent, canActivate: [AuthGuard]},
  // http://localhost:4200/login
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
