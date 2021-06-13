import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './_service/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	private roles: string[] = [];
	title = '';
	isLoggedIn = false;
	showAdminBoard = false;
	showModeratorBoard = false;
	username?: string;
  
	constructor(private tokenStorageService: TokenStorageService, private router: Router, private location: Location) { }
  
	ngOnInit(): void {
	  this.isLoggedIn = !!this.tokenStorageService.getToken();

	  if (!this.isLoggedIn) {
		  if (location.pathname !== '/register') {
			  this.router.navigate(['/login']);
		  }
	  }
  
	  if (this.isLoggedIn) {
		const user = this.tokenStorageService.getUser();
		this.roles = user.roles;
  
		this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
		this.showModeratorBoard = this.roles.includes('ROLE_USER');
  
		this.username = user.username;
	  }
	}
}
