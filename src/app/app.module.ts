import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductKeyboard1Component } from './product/product-keyboard1/product-keyboard1.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductKeyboard1Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
