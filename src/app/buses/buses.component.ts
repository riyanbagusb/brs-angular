import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CrudService } from '../_service/crud.service';

@Component({
	selector: 'app-buses',
	templateUrl: './buses.component.html',
	styleUrls: ['./buses.component.css']
})
export class BusesComponent implements OnInit {
	buses: any = [];
	addBusForm: FormGroup;
	successMessage = '';
	errorMessage = '';

	constructor(
		private crudService: CrudService,
		private formBuilder: FormBuilder,
	) {
		this.getBus();
		this.addBusForm = this.formBuilder.group({
			capacity: [''],
			code: [''],
			make: [''],
		})
	}

	ngOnInit(): void {
	}

	onSubmit(): any {
		this.crudService.addBus(this.addBusForm.value)
		.subscribe(() => {
				console.log('Data added successfully!')
				this.getBus();
				this.successMessage = "Bus added successfully!";
			}, (err) => {
				this.errorMessage = err.error.message;
		});
	}

	async getBus() {
		let agency = await this.crudService.getAgencyByUser().toPromise().then(res => {return res});
		
		this.crudService.GetBuses(agency.id).subscribe(res => {
			this.buses = res;
		});
	}

}
