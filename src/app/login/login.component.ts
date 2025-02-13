declare var google: any;

import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  private router = inject(Router);

  ngAfterViewInit(): void {
    if (!google || !google.accounts) {
      console.error("Google API not loaded. Ensure the Google Identity Services script is included in index.html.");
      return;
    }

    google.accounts.id.initialize({
      client_id: '291548464106-4erdg70ot3fec51qkbh5ogppsofavehv.apps.googleusercontent.com',
      callback: (resp: any) => this.handleLogin(resp),
    });

    const googleButton = document.getElementById("google-btn");
    if (googleButton) {
      google.accounts.id.renderButton(googleButton, {
        theme: 'filled_white',
        size: 'large',
        shape: 'circle',
        width: 400,
      });
    } else {
      console.error("Google button element not found!");
    }
  }

  private decodeToken(token: string) {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (error) {
      console.error("Invalid token format:", error);
      return null;
    }
  }
  handleLogin(response: any) {
    if (!response || !response.credential) {
      alert("Login failed! Please try again.");
      return;
    }
  
    const payload = this.decodeToken(response.credential);
    if (!payload || !payload.email) {
      alert("Invalid login response.");
      return;
    }
  
    sessionStorage.setItem("loggedInUser", JSON.stringify(payload));
  
    const email = payload.email;
    const isStudent = email.endsWith('@bitsathy.ac.in');
    const isFaculty = /^[a-zA-Z]+@gmail\.com$/.test(email);
    const isAdmin = email.endsWith('8595@gmail.com'); // Fix applied here
  
    if (isStudent) {
      this.router.navigate(['student-dashboard']);
    } else if (isFaculty) {
      this.router.navigate(['faculty-dashboard']);
    } else if (isAdmin) {
      this.router.navigate(['super-admin-dashboard']);
    } else {
      alert('Only valid @bitsathy.ac.in or faculty @gmail.com email addresses are allowed.');
    }
  }
  logout() {
    sessionStorage.removeItem("loggedInUser");
  }  
}
