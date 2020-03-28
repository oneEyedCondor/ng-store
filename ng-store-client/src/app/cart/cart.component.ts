import { Component, OnInit, DoCheck } from '@angular/core';
import { Cart, IOrder } from '../shared/services/cart.service';
import { IProduct } from '../shared/services/data.service';
import { EventBus, EventData } from '../shared/services/event-bus.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, DoCheck {
    cartProducts: Array<IProduct> = [];
    totalPrice: number;
    displayHistoryOfOrders: boolean = false;
    userOrders: Array<IOrder> = [];

    constructor(
        private eventBus: EventBus,
        public cart: Cart) {}

    ngOnInit() {}

    toggleHistoryOfOrders() {
        this.displayHistoryOfOrders = !this.displayHistoryOfOrders;
    }
    
    ngDoCheck() {
        this.cartProducts = this.cart.products;
        this.totalPrice = this.cart.getTotalPrice();
        this.userOrders = this.cart.orders;
    }
    
    addProductToCart(product: IProduct): void {
        this.cart.addToCart(product);
    }
    
    removeProductFromCart(id: number): void {
        this.cart.removeFromCart(id);
    }

    removeOnlyOne(id: number): void {
        this.cart.removeOnlyOne(id);
    }

    createOrder() {
        if(localStorage.getItem('current-user')) {
            this.cart.createOrder();
        } else {
            this.eventBus.emit(new EventData('notification', 'Sign in to order :)'));
        }
    }

}
