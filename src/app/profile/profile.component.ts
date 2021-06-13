import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../_service/auth.service';
import { CrudService } from '../_service/crud.service';
import { TokenStorageService } from '../_service/token-storage.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	user: any;
	updateProfile: FormGroup;
	updatePassword: FormGroup;
	successMessage: any = [];
	errorMessage: any = [];

	constructor(
		private tokenStorageService: TokenStorageService,
		public formBuilder: FormBuilder,
		private crudService: CrudService
	) {
		this.updateProfile = this.formBuilder.group({
			firstName: [''],
			lastName: [''],
			mobileNumber: [''],
		});

		this.updatePassword = this.formBuilder.group({
			password: ['']
		});

		this.getUser();
	}

	ngOnInit(): void { }

	onUpdateProfile() {
		this.crudService.updateProfile(this.updateProfile.value)
		.subscribe(() => {
			console.log('Profile updated successfully!');
			this.tokenStorageService.updateUser(this.updateProfile.value);
			this.getUser();
			this.successMessage[1] = "Profile updated successfully!";
		}, (err) => {
			this.errorMessage[1] = err.error.message;
		});
	}

	onUpdatePassword() {
		this.crudService.updatePassword(this.updatePassword.value)
		.subscribe(() => {
			console.log('Password updated successfully!');
			this.successMessage[2] = "Password updated successfully!";
		}, (err) => {
			this.errorMessage[2] = err.error.message;
		});
		
	}

	getUser() {
		this.user = this.tokenStorageService.getUser();

		this.updateProfile.setValue({
			firstName: this.user.firstName,
			lastName: this.user.lastName,
			mobileNumber: this.user.mobileNumber,
		});
	}

}
