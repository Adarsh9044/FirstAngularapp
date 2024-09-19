import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private router: Router,
    private service:AuthService
  ) {}

  ngOnInit() {
    // Fetch user data from localStorage or an API
    
    this.service.getProfile().subscribe((res)=>{
      this.user=res;
      console.log(res);
      if (this.user) {
        this.user = JSON.parse(this.user);
      } else {
        // If no user data found, redirect to login
        this.router.navigate(['/login']);
      }
    })
    
   
  }

  logout(): void {
    localStorage.removeItem('authToken');
    if (this.router.url !== '/Home') {  
      this.router.navigate(['/Home']);
    }
  }
  
}
