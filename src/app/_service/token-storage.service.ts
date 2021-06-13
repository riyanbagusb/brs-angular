import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
	providedIn: 'root'
})
export class TokenStorageService {

	constructor() { }

	signOut(): void {
		window.sessionStorage.clear();
	}

	public saveToken(token: string): void {
		window.sessionStorage.removeItem(TOKEN_KEY);
		window.sessionStorage.setItem(TOKEN_KEY, token);
	}

	public getToken(): string | null {
		return window.sessionStorage.getItem(TOKEN_KEY);
	}

	public saveUser(user: any): void {
		window.sessionStorage.removeItem(USER_KEY);
		window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
	}

	public updateUser(user: any): void {
		const oldUser = window.sessionStorage.getItem(USER_KEY);
		let data;
		if (oldUser) {
			data = JSON.parse(oldUser);
			data.firstName = user.firstName;
			data.lastName = user.lastName;
			data.mobileNumber = user.mobileNumber;
			
			window.sessionStorage.removeItem(USER_KEY);
			window.sessionStorage.setItem(USER_KEY, JSON.stringify(data));
		}
	}

	public getUser(): any {
		const user = window.sessionStorage.getItem(USER_KEY);
		if (user) {
		return JSON.parse(user);
		}

		return {};
	}
}
