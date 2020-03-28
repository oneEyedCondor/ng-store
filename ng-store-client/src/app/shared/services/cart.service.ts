import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IProduct } from './data.service';
import { EventBus, EventData } from './event-bus.service';

export interface IOrder {
    id: number;
    createdAt: Date;
    productId: number;
    productPrice: number;
    productCount: number;
    userId: number;
    product: IProduct;
}

@Injectable()
export class Cart {
    private userOrders: Array<IOrder> = [];
    private cartProducts: Array<IProduct> = JSON.parse(localStorage.getItem('saved-cart-products')) || [];

    get products(): Array<IProduct> {
        return this.cartProducts;
    }

    get orders(): Array<IOrder> {
        return this.userOrders;
    }

    constructor(
        private http: HttpClient,
        private eventBus: EventBus) {
            const currentUser = JSON.parse(localStorage.getItem('current-user'));
            currentUser && this.getUserOrders(currentUser.id);         
    }

    saveToLocalStorage() {
        if( this.getCountProducts() ) {
            localStorage.setItem('saved-cart-products', JSON.stringify(this.products));
        } else {
            localStorage.removeItem('saved-cart-products');
        }
    }

    addToCart(product: IProduct): void {
        this.cartProducts.push(product);
        this.saveToLocalStorage();
    }
    
    removeFromCart(id): void {
        this.cartProducts = this.cartProducts.filter(p => p.id !== id);
        this.saveToLocalStorage();
    }
    
    removeOnlyOne(id: number): void {
        const idx = this.cartProducts.findIndex(p => p.id === id);
        this.cartProducts.splice(idx, 1);
        this.saveToLocalStorage();
    }

    getCountProducts(): number {
        return this.cartProducts.length;
    }

    resetProducts(): void {
        this.cartProducts = [];
    }

    getTotalPrice(): number {
        return this.cartProducts.reduce((count, p) => count + Number(p.price), 0);
    }

    getUserOrders(userId): void {
        this.http.get<IOrder[]>(`http://localhost:1515/api/userOrders/${userId}`).subscribe(
            (userOrders: Array<IOrder>) => this.userOrders = userOrders,
            (err: HttpErrorResponse) => console.error(err)
        );
    }

    resetUserOrders(): void {
        this.userOrders = [];
    }

    getUniqueProducts(products: Array<IProduct>): Array<IProduct> {
        const uniqueProducts = products.reduce((acc, p) => {
            if(!acc[p.id]) {
                acc[p.id] = { ...p };
                acc[p.id].count = 1;
            } else {
                acc[p.id].count += 1;
            }
            return acc;
        }, []);

        return uniqueProducts.filter(_ => true)
    }

    createOrder(): void {        
        this.http.post<Array<IOrder>>('http://localhost:1515/api/order', this.getUniqueProducts(this.cartProducts))
            .subscribe(
                (newOrders: Array<IOrder>) => {
                    this.resetProducts();
                    localStorage.removeItem('saved-cart-products');

                    this.userOrders = [ ...this.userOrders, ...newOrders ];

                    const notificationMessage = 'Your order has been shipped. We will connect with you soon!';
                    this.eventBus.emit(new EventData('notification', notificationMessage));
                },
                (err: HttpErrorResponse) => console.error(err)
            );
    }
}