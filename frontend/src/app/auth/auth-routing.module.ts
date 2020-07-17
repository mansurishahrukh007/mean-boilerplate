import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      // { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {

}
