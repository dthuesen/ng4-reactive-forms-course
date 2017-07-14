import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { Customer } from './customer';

// the factory function which takes two parameters (min and max acceptable value)
function ratingRange(min: number, max: number): ValidatorFn {
  // custom validator
  return (control: AbstractControl): {[key: string]: boolean} | null => {
    if (control.value !== undefined && (isNaN(control.value) || control.value < min || control.value > max)) {
      return { 'range': true };
    };
    return null
  }
}

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
        emailGroup: this.fb.group({ // <-- the nested FormGroup
          email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]+')]],
          confirmEmail: ['', [Validators.required]], // <-- here - no pattern is needed for comparison
        }),
        phone: '',
        notification: 'email',
        rating: ['', ratingRange(1, 5)],
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

  setNotification(notifyVia: string): void {
    const phoneControl = this.customerForm.get('phone');
    if (notifyVia === 'text') {
      phoneControl.setValidators(Validators.required);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }

}
