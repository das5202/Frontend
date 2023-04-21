import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Models/Product.model';
import { HttpClient } from '@angular/common/http';
import { Observable,} from 'rxjs';
import { ShareService } from 'src/app/Services/share.service';
import { NavbarServiceService } from 'src/app/Services/navbar-service.service';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit {
   public products:Product[];
  constructor(private router:Router, private service:ShareService,private http:HttpClient, public nav:NavbarServiceService ) {}
   ngOnInit(): void {
    this.nav.show();
    this.refreshList();
  }
delete(id:number){
  if(confirm('Are you sure?')){
    this.service.DeleteProduct(id).subscribe(data=>{
      console.log(data);
      this.refreshList();
    });
    location.reload();
  }
  
} 
refreshList(){
      this.service.GetAllProduct().subscribe(data=>{
        this.products=data;
        console.log(this.products)
      });

      

 }
//  onLogout() {
//   localStorage.clear();
//   this.router.navigate(['/home']);
// }
}
