import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as socketIo from 'socket.io-client';

const SERVER_URL = `ws://localhost:1515`;

export interface IUser {
    id: number;
    name: string;
    login: string;
}

export interface IComment {
    id?: number;
    text: string;
    date: Date;
    userId:	number;
    productId: number;
    user?: IUser;
}

@Injectable()
export class Comment {
    private socket;

    constructor() {}

    initSocket(): void {
        this.socket = socketIo(SERVER_URL);
    }

    requestProductComments(productId: number): void {
        this.socket.emit('get-comments', productId);
    }

    addCommentToProduct(comment: IComment): void {
        this.socket.emit('add-comment', comment);
    }

    onSocketEvent(event): Observable<any> {
        return new Observable<Event>(observer => {
            this.socket.on(event, (arg?: any) => observer.next(arg));
        });
    }

    getCommentsOfProduct(): Observable<IComment[]> {
        return new Observable<IComment[]>(observer => {
            this.socket.on('product-comments', (commentsOfProduct: Array<IComment>) => observer.next(commentsOfProduct));
        });
    }
}