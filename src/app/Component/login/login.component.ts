import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormGroup,FormControl,AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ShareService } from 'src/app/Services/share.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from 'src/app/Services/account.service';
import { NavbarServiceService } from 'src/app/Services/navbar-service.service';
import { FooterService } from 'src/app/Services/footer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  public IsLogin =false;
  public LoginForm = this.fb.group({​​​​​
    EmailId: ['',[Validators.required,Validators.email]], 
    Password: ['', Validators.required]});
    submitted = false;
    
    get Password(){
      return this.LoginForm.get('Password');
    }
    get EmailId(){
      return this.LoginForm.get('EmailId');
      }
    get f() { return this.LoginForm.controls; }
    
  constructor( private http:HttpClient ,private nav:NavbarServiceService, private Service:ShareService, private fb:FormBuilder, private Http:HttpClient, private router:Router) { }
  
    ngOnInit(): void {
    this.nav.show();
    
    }
onSubmit() {
    this.Service.userlogin(this.LoginForm.value).subscribe(
      (res:any) =>{
        console.log(res)
        localStorage.setItem('token',res.token);
        console.log(res.token);
        if(this.LoginForm.value.EmailId=='admin@gmail.com'){
        localStorage.setItem("isAdmin","true");
        // this.router.navigate(['login/admin']);
        location.href="/login/admin";
      }
        else{
          
          this.IsLogin=true;
          localStorage.setItem("isAdmin","false");
          // this.router.navigate(['products']);
          location.href="/products";
        }
        
      },
      err =>{
        if(err.status==404)
        alert("Authentication Failed!! Invalid Credentails");
        else
        console.log(err);
      }
    );

    
  }
}
