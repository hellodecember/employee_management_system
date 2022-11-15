import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/models/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-employee-edit',
	templateUrl: './employee-edit.component.html',
	styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
	submitted = false;
	editForm: FormGroup;
	employeeData: Employee[];
	EmployeeProfile: any = ['Finance', 'BDM', 'HR', 'Sales', 'Admin'];

	constructor(
		public fb: FormBuilder,
		private actRoute: ActivatedRoute,
		private apiService: ApiService,
		private router: Router
	) { }

	ngOnInit(): void {
		this.updateEmployee();
		let id = this.actRoute.snapshot.paramMap.get('id');
		this.getEmployee(id);
		this.editForm = this.fb.group({
			name: ['', [Validators.required]],
			email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
			designation: ['', [Validators.required]],
			phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
		});
	}

	// choose options w/dropdown
	updateProfile(e) {
		this.editForm.get('designation').setValue(e, {
			onlySelf: true
		});
	}

	// accessor to form control
	get myForm() {
		return this.editForm.controls;
	}

	getEmployee(id) {
		this.apiService.getEmployee(id).subscribe((data) => {
			this.editForm.setValue({
				name: data['name'],
				email: data['email'],
				designation: data['designation'],
				phoneNumber: data['phoneNumber']
			})
		});
	}

	updateEmployee() {
		this.editForm = this.fb.group({
			name: ['', [Validators.required]],
			email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
			designation: ['', [Validators.required]],
			phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
		});
	}

	onSubmit() {
		this.submitted = true;
		if(!this.editForm.valid) {
			return false;
		}
		else {
			let id = this.actRoute.snapshot.paramMap.get('id');
			return this.apiService.updateEmployee(id, this.editForm.value).subscribe({
				complete: () => {
					this.router.navigateByUrl('/employees-list');
					console.log('Content updated successfully!');
				},
				error: (e) => {
					console.log(e);
				}
			});
		}
	}
}
