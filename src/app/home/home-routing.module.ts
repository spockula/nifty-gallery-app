import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { LoginComponent } from '../login/login.component';
import { MainGuard } from '../guards/main.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage, canActivate: [MainGuard]
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
