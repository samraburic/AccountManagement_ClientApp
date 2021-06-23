import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/_helpers';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path : '', component : HomeComponent, canActivate : [AuthGuard]
  },
  {
    path: 'login', component: LoginComponent
 },
  {
    path : 'clients',
    loadChildren : () => import('./clients/client.module').then(m => m.ClientModule),
    canActivate: [AuthGuard]
  },
  {
    path : 'meetings',
    loadChildren : () => import('./meeting/meeting.module').then(m => m.MeetingModule), 
    canActivate : [AuthGuard]
  },
  {
    path: 'users',
    loadChildren : () => import('./users/user.module').then(m => m.UserModule), 
    canActivate : [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
