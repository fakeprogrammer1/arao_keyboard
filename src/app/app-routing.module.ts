import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductKeyboard1Component } from './product/product-keyboard1/product-keyboard1.component';

const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'products/keyboard', component: ProductKeyboard1Component },
  { path: '', redirectTo: '/products', pathMatch: 'prefix' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}