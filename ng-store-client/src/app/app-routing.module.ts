import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ProductsComponent } from './products/products.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { CartComponent } from './cart/cart.component';
import { CartGuard } from './cart/cart.guard';

const routes: Routes = [
    { path: '',             component: ProductsComponent },
    { path: 'auth/:action', component: AuthComponent },
    { path: 'product/:id',  component: ProductInfoComponent },
    { path: 'cart',         component: CartComponent, canActivate: [CartGuard] },
    { path: '**',           redirectTo: '/' }
];

@NgModule({
    imports:    [ RouterModule.forRoot(routes) ],
    exports:    [ RouterModule ],
    providers:  [ CartGuard ]
})
export class AppRoutingModule { }
