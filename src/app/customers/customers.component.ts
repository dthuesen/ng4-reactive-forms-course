import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Customer } from './customer';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'my-signup',
  templateUrl: './customers.component.html',
})
export class CustomersComponent implements OnInit {

  customerForm: FormGroup;                    // the root form group
  customer: Customer= new Customer();

  constructor(private fb: FormBuilder) { }

  // without formbuilder it would look like this:
  /*

    // This in whole is the form model that keeps the validty and state of the whole form

    ngOnInit(): void {
      this.customerForm = new FormGroup({     // new instance of the root FormGroup
        firstName: new FormControl(),         // new instance of a FormControl
        latName: new FormControl(),
        email: new FormControl(),
        sendCatalog: new FormControl(true)    // FormControl with default value
      })
    }
  */

  ngOnInit(): void {
    this.customerForm = this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(3)]],
        lastName: ['', [Validators.required, Validators.maxLength(50)]],
        email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]+')]],
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
