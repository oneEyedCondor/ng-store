import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router"
import { Observable } from 'rxjs';
import { Cart } from '../shared/services/cart.service';

@Injectable()
export class CartGuard implements CanActivate {
    constructor(private cart: Cart) {}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return !!this.cart.products.length || !!this.cart.orders.length;
    }
    
}