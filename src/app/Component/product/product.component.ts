import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Models/Product.model';
import { ShareService } from 'src/app/Services/share.service';
import { NavbarServiceService } from 'src/app/Services/navbar-service.service';
import { FooterService } from 'src/app/Services/footer.service';
import Cart from 'src/app/Models/Cart.model';
import { LoginComponent } from '../login/login.component';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
 public products: Product[] ;
 public search: string;
 private router:Router;
 
  constructor(private service:ShareService,private nav :NavbarServiceService ,private fs :FooterService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        console.log(params); // { category: "fiction" }
        this.search = params['search'];
        console.log(this.search); // fiction
        if (this.search) {
this.getSearchedProduct(this.search);
        } else {
          this.refreshProductList();
        }
      }
    );
  
    this.nav.show();
    this.nav.doSomethingElseUseful();
    this.fs.show();
    this.fs.doSomethingElseUseful(); 
  }
  refreshProductList(){
    this.service.GetAllProduct().subscribe(data=>{
      this.products=data;
      console.log(this.products)
    });
  }

  getSearchedProduct(search: string) {
this.service.SearchProduct(search).subscribe((data:any)=> {
  console.log(data);
  this.products=data;
}, err => this.products = [])
  }
  addToCart(products:Product){
    
    console.log(products);
    
      this.service.addToCart(products).subscribe(val=>{
        location.href="cart";
        // this.router.navigate(['cart']);
      
      });
      // alert("Added to Cart!");
      

    }
}
