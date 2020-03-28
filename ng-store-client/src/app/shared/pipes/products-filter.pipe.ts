import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../services/data.service';

@Pipe({
    name: 'productsFilter',
    pure: false
})
export class ProductsFilterPipe implements PipeTransform {
    transform(products: Array<IProduct>, filter: string, searchStr?: string): Array<IProduct> {
        if(filter === 'unique') {
            return this.getUniqueProducts(products);
        }

        if(searchStr.trim() !== '') {
            products = this.searchProduct(products, searchStr);
        }

        const filterByPriceHigh = (p, i, j) => {
            if(p[i].price < p[j].price) {
                [p[i], p[j]] = [p[j], p[i]];
            }
        };
        const filterByPriceLow = (p, i, j) => {
            if(p[i].price > p[j].price) {
                [p[i], p[j]] = [p[j], p[i]];
            }
        };
        const filterByName = (p, i, j) => {
            if(p[i].name < p[j].name) {
                [p[i], p[j]] = [p[j], p[i]];
            }
        };
        const filterById = (p, i, j) => {
            if(p[i].id < p[j].id) {
                [p[i], p[j]] = [p[j], p[i]];
            }
        };

        switch(filter) {
            case 'price_high':
                return this.filterProducts(filterByPriceHigh, products);
            case 'price_low':
                return this.filterProducts(filterByPriceLow, products);
            case 'name':
                return this.filterProducts(filterByName, products);
            case 'reset':
                return this.filterProducts(filterById, products);
            default:
                return products;
        }
    }

    filterProducts(
        filterFc: (arr: Array<IProduct>, idx1: number, idx2: number)=>void, 
        products: Array<IProduct>
    ): Array<IProduct> {

        for(let i=0; i<products.length; i++) {
            for(let j=0; j<products.length; j++) {
                filterFc(products, i, j);
            }   
        }
        return products;
    }

    searchProduct(products: Array<IProduct>, searchStr): Array<IProduct> {
        return products.filter( p => p.name.toLowerCase().indexOf(searchStr.toLowerCase()) !== -1 );
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

        return uniqueProducts.filter(_ => true);
    }
}