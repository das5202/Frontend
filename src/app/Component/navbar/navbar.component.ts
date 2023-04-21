import { Component, OnInit } from '@angular/core';
import { NavbarServiceService } from 'src/app/Services/navbar-service.service';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
@Component({
 
  selector: 'sd-navbar',
   templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
public isAdmin=false;
  constructor(public nav: NavbarServiceService,public router:Router) {
    
   }

  ngOnInit(): void { 
    var lst=localStorage.getItem("isAdmin");
    console.log(lst);
    if(lst=="true"){
    
      this.isAdmin=true;
    }
    else{
      this.isAdmin=false;
    }
    console.log(this.isAdmin,"xyz");
    
    }

  parseJwt (token:any) {
    if (token) {
      var base64Url = token.split('.')[1];
    var base64 = base64Url?.replace(/-/g, '+')?.replace(/_/g, '/');
    if (base64) {
      var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
    }
    } else {
      return null;
    }
};

  search(searchInput: HTMLInputElement) {
const {value} = searchInput;

if (value.trim().length) {
this.router.navigate(['products'], {queryParams: {search: value}});
  
}

  }
  shouldShowCart() {
    const token=localStorage.getItem('token');
    const user=this.parseJwt(token);
    return user?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] !== "admin@gmail.com";
  }
  onLogout() {
    localStorage.clear();
    this.router.navigate(['/home']);
  }
}
