import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs'; 
import { UserDetails } from '../Models/UserDetails.model';
import { Product } from '../Models/Product.model';
import cart from '../Models/Cart.model';
import { feedback } from '../Models/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  public userService =  UserDetails;
  public products :Product[];
  public product:Product;
  public cart:cart[];
  readonly APIUrl ="https://localhost:44334"
  constructor(private http:HttpClient) { }

//Product Service
GetAllProduct():Observable<Product[]>{
  return this.http.get<Product[]>(this.APIUrl+'/api/Products/GetAllProducts')
}
readonly apiurl="https://localhost:44334/api/Products/AddProduct"
Addproduct(val:any){
  return this.http.post(this.apiurl,val);
}

UpdateProduct(val:any){
  return this.http.put<Product[]>(this.APIUrl+'/api/Products/UpdateProduct/'+val.productId,val);
}
DeleteProduct(id:number){
  return this.http.delete<Product[]>(this.APIUrl+'/api/Products/DeleteProduct?id='+id);
}
GetProduct(val:any){
  return this.http.post(this.APIUrl+'api/Products/GetProductById?ProductId=',val);
}
SearchProduct(val:any){
  return this.http.get(this.APIUrl+'/api/Products/Search?ProductName=' + val);
}

//Cart Service
UpdateCart(val:any){
  return this.http.put(this.APIUrl+'/api/Cart/UpdateCart?id=' +val.cartId,val)
}
addToCart(val:any){
  return this.http.post<cart>(this.APIUrl+'/api/Cart/AddToCart',val);
}
GetAllCart():Observable<cart[]>
{
return this.http.get<cart[]>(this.APIUrl+'/api/Cart/GetAllCart')
}
DeleteFromCart(id:number)
{ return this.http.delete<cart[]>(this.APIUrl+'/api/Cart/DeleteCart?id='  + id)
}

//User service


GetAllUserDetails():Observable<any[]>{
  return this.http.get<any[]>(this.APIUrl+'/api/UserDetails/GetAllUserDetails')
}
addUserDetails(val:any){
  console.log(val);
  const payload = {
    ...val,
    Password: val.NewPassword
  }
  return this.http.post<UserDetails>(this.APIUrl+'/api/UserDetails/RegisterUser',payload)
  }
 userlogin(val:any){
   console.log(val);
   return this.http.post<UserDetails>(this.APIUrl+'/api/Authenticate/Login',val)
 }
EmailService(name:any,receiver:any){
  return this.http.get<any[]>(this.APIUrl+'/api/UserDetails/EmailService?name='+name+'&receiver='+receiver)
 }
 getUserProfile(){
  var tokenHeader = new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('token')})
  console.log(tokenHeader);
  return this.http.get(this.APIUrl+'/api/UserDetails/GetUserDetailsById?id', {headers : tokenHeader});
}

//Order Service
addOrderDetails(val:any){
  console.log(val);
  return this.http.post<cart[]>(this.APIUrl+'/api/Orders/GetAllOrders',val)
}

//Feedback Service
GetAllFeedDetails():Observable<feedback[]>
{
 return this.http.get<feedback[]>(this.APIUrl+'/api/feedback/GetAllFeedback')
}
addFeedDetails(val:any){
  console.log(val);
  return this.http.post<feedback>(this.APIUrl+'/api/feedback/AddFeedback',val)
}

}