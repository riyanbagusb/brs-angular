import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CrudService } from '../_service/crud.service';

@Component({
	selector: 'app-agency',
	templateUrl: './agency.component.html',
	styleUrls: ['./agency.component.css']
})
export class AgencyComponent implements OnInit {
	agency: any = [];
	updateForm: FormGroup;
	successMessage = '';
	errorMessage = '';

	constructor(
		private crudService: CrudService,
		public formBuilder: FormBuilder
	) {
		this.updateForm = this.formBuilder.group({
			code: [''],
			name: [''],
			details: [''],
			owner: ['']
		});

		this.getAgency();
	}

	ngOnInit(): void {}

	onUpdate(): any {
		this.crudService.updateAgency(this.agency.id ,this.updateForm.value)
		.subscribe(() => {
			console.log('Data updated successfully!');
			this.getAgency();
			this.successMessage = "Agency updated successfully!";
		}, (err) => {
			this.errorMessage = err.error.message;
		});
	}

	getAgency() {
		this.crudService.getAgencyByUser().subscribe(res => {
			this.agency = res;

			this.updateForm.setValue({
				code: this.agency.code,
				name: this.agency.name,
				details: this.agency.details,
				owner: this.agency.owner
			});
		});
	}
}
