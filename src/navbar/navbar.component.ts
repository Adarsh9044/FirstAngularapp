import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {



  isLoggedIn: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Check if the user is logged in (based on token or any other logic)
    this.isLoggedIn = !!localStorage.getItem('authToken');
  }

  // Handle logout logic
  logout() {
    // Clear the authentication token
    localStorage.removeItem('authToken');
    
    // Set isLoggedIn to false
    this.isLoggedIn = false;

    // Redirect to login after logging out
    this.router.navigate(['/login']);
  }
}



