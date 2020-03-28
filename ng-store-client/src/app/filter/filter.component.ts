import { Component } from '@angular/core';
import { Data, Filter } from '../shared/services/data.service';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
    productsFilter: Filter;

    constructor(private data: Data) {
        this.productsFilter = data.filter;
    }

    changeFilter(orderBy?: string): void {
        if(orderBy) {
            this.productsFilter.orderBy = (this.productsFilter.orderBy !== orderBy) ? orderBy : 'reset';
        }
        this.data.filter = this.productsFilter;
    }
}
