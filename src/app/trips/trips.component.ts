import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CrudService } from '../_service/crud.service';

@Component({
	selector: 'app-trips',
	templateUrl: './trips.component.html',
	styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {
	trips: any = [];
	agency: any = [];
	buses: any = [];
	stops: any = [];
	selectedStop: any = [];
	addTripForm: FormGroup;
	errorMessage = '';
	successMessage = '';

	constructor(
		private crudService: CrudService,
		private formBuilder: FormBuilder,
	) {
		this.getAll();

		this.crudService.GetStops().subscribe(res => {
			this.stops = res;
		});

		this.addTripForm = this.formBuilder.group({
			agencyId: [''],
			busId: [''],
			sourceStopId: [''],
			destStopId: [''],
			journeyTime: [''],
			fare: [''],
		})
	}

	ngOnInit(): void {
	}

	onSubmit(): any {
		this.crudService.addTrip(this.addTripForm.value)
		.subscribe(() => {
				console.log('Data added successfully!')
				this.getTrips();
				this.successMessage = "Trip added successfully!";
			}, (err) => {
				this.errorMessage = err.error.message;
		});
	}

	async getAgency() {
		await this.crudService.getAgencyByUser().toPromise().then(res => {this.agency = res});
	}

	async getTrips() {
		let agency = await this.crudService.getAgencyByUser().toPromise().then(res => {return res});

		this.crudService.GetTrips(agency.id).subscribe(res => {
			this.trips = res;
		});
	}

	async getBus() {
		let agency = await this.crudService.getAgencyByUser().toPromise().then(res => {return res});
		
		this.crudService.GetBuses(agency.id).subscribe(res => {
			this.buses = res;
		});
	}

	async getAll() {
		await this.getAgency();

		await this.getTrips();
		
		await this.getBus();

		this.addTripForm = this.formBuilder.group({
			agencyId: this.agency.id,
			busId: [''],
			sourceStopId: [''],
			destStopId: [''],
			journeyTime: [''],
			fare: [''],
		})
	}

}
