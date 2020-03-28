import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { EventBus, EventData } from '../shared/services/event-bus.service';
import { Data, IProduct } from '../shared/services/data.service';
import { Cart } from '../shared/services/cart.service';
import { Comment, IComment } from '../shared/services/comment.service';

@Component({
    selector: 'app-product-info',
    templateUrl: './product-info.component.html',
    styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {
    product: IProduct;
    comments: Array<IComment> = [];
    textOfComment: string = '';

    constructor(
        private route: ActivatedRoute,
        private eventBus: EventBus,
        private data: Data,
        private cart: Cart,
        private commentSrc: Comment) {}

    ngOnInit() {
        this.commentSrc.initSocket();
        this.commentSrc.onSocketEvent('connect').subscribe(() => console.log('connected'));
        this.commentSrc.onSocketEvent('error').subscribe((err) => console.error(err));
        this.commentSrc.onSocketEvent('disconnect').subscribe(() => console.log('disconnected'));

        this.route.paramMap
            .pipe(
                switchMap(params => {
                    const productId = params.getAll('id');
                    return this.data.getProductById(+productId);
                })
            )
            .subscribe(
                (product: IProduct) => {
                    this.product = product;
                    this.product && this.commentSrc.requestProductComments(this.product.id);
                },
                (err: HttpErrorResponse) => console.error(err)
            );

        this.commentSrc.getCommentsOfProduct()
            .subscribe((commentsOfProduct: Array<IComment>) => {
                if(commentsOfProduct[0].productId === this.product.id) {
                    this.comments = commentsOfProduct
                }
            });
    }

    addToCart() {
        this.cart.addToCart(this.product);
    }

    addCommentToProduct() {
        if(!this.textOfComment.trim()) {
            return;
        }

        if(localStorage.getItem('current-user')) {
            const newComment = {
                text: this.textOfComment,
                date: new Date(),
                userId: JSON.parse(localStorage.getItem('current-user')).id,
                productId: this.product.id,
            };

            this.commentSrc.addCommentToProduct(newComment);
            this.textOfComment = '';
        } else {
            this.eventBus.emit(new EventData('notification', 'Sign in to comment :)'));
        }    
    }

}