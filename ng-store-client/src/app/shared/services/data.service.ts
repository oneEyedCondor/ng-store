import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IProduct {
    id: number;
    name: string;
    manufacturer: string;
    description: string;
    price: number;
    image?: string;
    count?: number;
    category?: string;
    rating?: number;
}

export interface Filter {
    orderBy: string;
    searchStr: string;
};

@Injectable()
export class Data {
    private productsFilter: Filter = {
        orderBy: 'all',
        searchStr: '',
    };

    get filter() {
        return this.productsFilter;
    }
    set filter(f: Filter) {
        this.productsFilter = f;
    }

    constructor(private http: HttpClient) {}

    getAllProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>('http://localhost:1515/api/products');
    }

    getProductById(productId: number): Observable<IProduct> {
        return this.http.get<IProduct>(`http://localhost:1515/api/product/${productId}`);
    }
}