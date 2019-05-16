import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductKeyboard1Component } from './product/product-keyboard1/product-keyboard1.component';
import { ModalComponent  } from './product/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductKeyboard1Component,
    ModalComponent ,
  ],
  entryComponents: [
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
