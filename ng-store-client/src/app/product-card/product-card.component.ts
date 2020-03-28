import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from '../shared/services/data.service';
import { Cart } from '../shared/services/cart.service';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
    @Input() product: IProduct;

    constructor(private cart: Cart) { }

    ngOnInit() {
    }

    addProduct() {
        this.cart.addToCart(this.product);
    }

}