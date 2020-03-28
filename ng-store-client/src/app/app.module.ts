import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { FilterComponent } from './filter/filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductsComponent } from './products/products.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { CartComponent } from './cart/cart.component';
import { NotificationComponent } from './notification/notification.component';
import { ProductsFilterPipe } from './shared/pipes/products-filter.pipe';

import { Auth } from './shared/services/auth.service';
import { AuthInterceptor } from './shared/services/auth-interceptor';
import { EventBus } from './shared/services/event-bus.service';
import { Data } from './shared/services/data.service';
import { Cart } from './shared/services/cart.service';
import { Comment } from './shared/services/comment.service';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        AuthComponent,
        ProductsComponent,
        ProductInfoComponent,
        ProductCardComponent,
        CartComponent,
        FilterComponent,
        ProductsFilterPipe,
        NotificationComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        FontAwesomeModule
    ],
    providers: [
        Data,
        Cart,
        Comment,
        EventBus,
        Auth,
        AuthInterceptor, {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }