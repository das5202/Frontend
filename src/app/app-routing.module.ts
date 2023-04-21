import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditProductsComponent } from './Component/admin-landing-page/add-edit-products/add-edit-products.component';

const routes: Routes = [
  {path:'add-edit-product/edit/:productId',
  component: AddEditProductsComponent
}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  
 }

