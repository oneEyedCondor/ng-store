import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUserCog } from '@fortawesome/free-solid-svg-icons';
import { Auth, IUser } from '../shared/services/auth.service';
import { Cart } from '../shared/services/cart.service';
import { EventBus } from '../shared/services/event-bus.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck {
    faUserCog = faUserCog;
    totalPrice: number = 0;
    countProducts: number = 0;
    userCardVisible: boolean = false;
    currentUser: IUser = JSON.parse(localStorage.getItem('current-user'));

    constructor(
        private auth: Auth,
        private eventBus: EventBus,
        private router: Router,
        public cart: Cart) {}

    ngOnInit() {
        this.eventBus.on('auth', () => {
            this.currentUser = JSON.parse(localStorage.getItem('current-user'));
        });  
    }

    ngDoCheck() {
        this.totalPrice = this.cart.getTotalPrice();
        this.countProducts = this.cart.getCountProducts();
    }

    openCart() {
        this.router.navigate(['cart']);
    }

    displayUserCard() {
        this.userCardVisible = !this.userCardVisible;
    }

    displayComponentAuth(e) {
        const action = (e.target.textContent === 'sign in') ? 'sign-in' : 'sign-up';
        this.router.navigate(['auth', action]);
        this.userCardVisible = false;
    }
    
    signOut() {
        this.auth.signOut();
        this.userCardVisible = false;
        this.currentUser = null;
    }
}
