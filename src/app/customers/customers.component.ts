import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Customer } from './customer';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'my-signup',
  templateUrl: './customers.component.html',
})
export class CustomersComponent implements OnInit {

  customerForm: FormGroup;
  customer: Customer= new Customer();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
        firstName: '',
        lastName: '',
        email: '',
        sendCatalog: true
    });
  }

  populateTestData(): void {
    this.customerForm.patchValue({
        firstName: 'Jack',
        lastName: 'Harkness',
        sendCatalog: false
    });
  }

  save() {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }

}
