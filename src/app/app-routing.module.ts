import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StorefrontComponent } from './storefront/storefront.component';
import { CartComponent } from './cart/cart.component';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "shop",
    component: StorefrontComponent
  },
  {
    path: "cart",
    component: CartComponent,
    // canActivate: [CartGuardGuard] this is freaking broken
  },
  { path: '',
    redirectTo: '/shop',
    pathMatch: 'full'
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { 
}


