import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignupComponent } from './signup/signup.component';
import { RestaurantCardComponent } from './restaurant-card/restaurant-card.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { LoginComponent } from './login/login.component';
import { DummyComponent } from './dummy/dummy.component';



const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: RestaurantCardComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'restaurant/:id', component: RestaurantDetailComponent },
  { path: 'login', component: LoginComponent },
  {path:'favourite-restaurant',component:DummyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
