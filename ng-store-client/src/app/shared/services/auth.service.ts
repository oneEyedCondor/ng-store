import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { EventBus, EventData } from './event-bus.service';
import { Cart } from './cart.service';

export interface IUser {
    id?: number;
    name?: string;
    login: string;
    password: string;
}

export interface IAuthData {
    message: string;
    user: IUser;
    token: string;
}

@Injectable()
export class Auth {

    constructor(
        private http: HttpClient,
        private router: Router,
        private eventBus: EventBus,
        private cart: Cart) { }
        // private chatService: ChatService) { }

    onSuccess({ message: infoMessage, user, token }: IAuthData): void {
        if((infoMessage === 'authenticated' || infoMessage === 'registered') && token) {
            localStorage.setItem('current-user', JSON.stringify(user));
            localStorage.setItem('user-token', token);
            this.eventBus.emit(new EventData('auth'));
            this.router.navigate(['/']);
        }
    }

    signIn(body: IUser): void {
        // if(localStorage.getItem('current-user')) {
        //     this.chatService.initSocket();
        //     this.chatService.emitSignOut();
        // };

        this.http.post('http://localhost:1515/api/signIn', body)
            .subscribe(
                (response: IAuthData) => {
                    this.onSuccess(response);
                    this.cart.getUserOrders(response.user.id);
                },
                (err: HttpErrorResponse) => this.router.navigate(['auth', 'sign-in'])
            );
    }

    signUp(body: IUser): void {
        this.http.post('http://localhost:1515/api/signUp', body)
            .subscribe(
                (response: IAuthData) => this.onSuccess(response),
                (err: HttpErrorResponse) => this.router.navigate(['auth', 'sign-up'])
            );
    }

    signOut(): void {
        localStorage.clear();
        this.cart.resetProducts();
        this.cart.resetUserOrders();
        this.router.navigate(['/']);
    }
}
