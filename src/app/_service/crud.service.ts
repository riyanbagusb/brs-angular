import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';

@Injectable({
	providedIn: 'root'
})
export class CrudService {

	REST_API: string = 'http://localhost:8080/api/v1';

	constructor(private httpClient: HttpClient, private tokenStorageService: TokenStorageService) { }

	httpHeaders = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + this.tokenStorageService.getToken()
	});

	user = this.tokenStorageService.getUser();

	//==================AGENCY PAGE==================
	getAgencyByUser(): Observable<any> {
		let API_URL = `${this.REST_API}/agency/${this.user.id}`;
		return this.httpClient.get(API_URL, { headers: this.httpHeaders })
		.pipe(map((res: any) => {
				return res || {}
			}),
			catchError(this.handleError)
		)
	}

	updateAgency(id: any, data: any) {
		return this.httpClient.put(`${this.REST_API}/agency/${id}`, data, { headers: this.httpHeaders })
		.pipe(
			catchError(this.handleError)
		)
	}

	addAgency(data: any) {
		return this.httpClient.post(`${this.REST_API}/agency/`, data, { headers: this.httpHeaders })
		.pipe(
			catchError(this.handleError)
		)
	}

	//==================BUS PAGE==================

	GetBuses(agency_id: any = "1") {
		return this.httpClient.get(`${this.REST_API}/bus/${agency_id}`, { headers: this.httpHeaders })
		.pipe(
			catchError(this.handleError)
		)
	}

	addBus(data: any) {
		return this.httpClient.post(`${this.REST_API}/bus/${this.user.id}`, data, { headers: this.httpHeaders })
		.pipe(
			catchError(this.handleError)
		)
	}

	//==================TRIP PAGE==================

	GetTrips(agency_id: any = "1") {
		let API_URL = `${this.REST_API}/trip/${agency_id}`
		return this.httpClient.get(API_URL, { headers: this.httpHeaders })
		.pipe(
			catchError(this.handleError)
		)
	}
	
	GetStops() {
		return this.httpClient.get(`${this.REST_API}/stop/`, { headers: this.httpHeaders })
		.pipe(
			catchError(this.handleError)
		)
	}

	addTrip(data: any) {
		return this.httpClient.post(`${this.REST_API}/trip/`, data, { headers: this.httpHeaders })
		.pipe(
			catchError(this.handleError)
		)
	}

	//==================PROFILE PAGE==================

	updateProfile(data: any) {
		return this.httpClient.put(`${this.REST_API}/user/${this.user.id}`, data, { headers: this.httpHeaders })
		.pipe(
			catchError(this.handleError)
		)
	}

	updatePassword(data: any) {
		return this.httpClient.put(`${this.REST_API}/user/password/${this.user.id}`, data, { headers: this.httpHeaders })
		.pipe(
			catchError(this.handleError)
		)
	}



	//==================HANDLER==================

	handleError(error: HttpErrorResponse) {
		let errorMessage = '';
		if (error.error instanceof ErrorEvent) {
		// Handle client error
		errorMessage = error.error.message;
		} else {
		// Handle server error
		errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
		}
		console.log(errorMessage);
		return throwError(errorMessage);
	}
}
