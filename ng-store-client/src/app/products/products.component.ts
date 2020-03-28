import { Component, OnInit } from '@angular/core';
import { Data, IProduct } from '../shared/services/data.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
    allProducts: Array<IProduct> = [];
    loading: boolean = true;

    constructor(public data: Data) {}

    ngOnInit() {
        this.data.getAllProducts().subscribe(allProducts => {
            this.allProducts = allProducts;
            this.loading = false;
        });
    }
}