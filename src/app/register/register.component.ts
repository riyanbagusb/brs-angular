import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_service/auth.service';
import { TokenStorageService } from '../_service/token-storage.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	registerForm: FormGroup;
	errorMessage = '';

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		private tokenStorage: TokenStorageService,
		private router: Router
	) {
		this.registerForm = this.formBuilder.group({
			username: [''],
			firstName: [''],
			lastName: [''],
			email: [''],
			mobileNumber: [''],
			password: [''],
			role: [['admin']]
		})
	}

	ngOnInit(): void {
		if (this.tokenStorage.getToken()) {
			this.router.navigate(['/dashboard']);
		}
	}

	onSubmit(): any {
		this.authService.register(this.registerForm.value)
		.subscribe(() => {
			console.log('Data added successfully!')
			this.router.navigateByUrl('/login')
		  }, (err) => {
			this.errorMessage = err.error.message;
		});
	  }

}
