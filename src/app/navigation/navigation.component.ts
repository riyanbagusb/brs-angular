import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_service/token-storage.service';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
})
export class NavigationComponent implements OnInit {
	username?: string;

	constructor(private tokenStorageService: TokenStorageService) { }

	ngOnInit(): void {
		const user = this.tokenStorageService.getUser();
		this.username = user.username;
	}

	logout(): void {
		this.tokenStorageService.signOut();
		window.location.reload();
	}
}
