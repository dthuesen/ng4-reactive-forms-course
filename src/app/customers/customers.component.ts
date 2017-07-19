import 'rxjs/add/operator/debounceTime'

import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { Customer } from './customer';

// the email comparison function
function emailMatcher(control: AbstractControl): {[key: string]: boolean} | null {
  const emailControl = control.get('email');
  const confirmControl = control.get('confirmEmail');

  if (emailControl.pristine || confirmControl.pristine) {
    return null;
  }

  if (emailControl.value === confirmControl.value) {
    return null
  }
  return { 'match': true };
}

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
  emailMessage: any;

  private validationMessages = {
    required: 'Please enter your email address - you don\'t dare.',
    pattern: 'Please enter a valid email address - you don\'t dare.',
  }

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
        }, { validator: emailMatcher }),
        phone: '',
        notification: 'email',
        rating: ['', ratingRange(1, 5)],
        sendCatalog: true
    });

    this.customerForm.get('notification').valueChanges.subscribe( value => this.setNotification(value) );

    ////
    // The watcher for the FormControl 'emailGroup.email'
    ////
    const emailControl = this.customerForm.get('emailGroup.email');
    emailControl.valueChanges
                    .debounceTime(2000)
                    .subscribe( value => {
      this.setMessage(emailControl);
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

  ////
  // the new method for setting the validation messages
  ////
  setMessage(control: AbstractControl): void {
    this.emailMessage = '';

    if ( (control.touched || control.dirty ) && control.errors ) {
      this.emailMessage = Object.keys(control.errors).map( key => this.validationMessages[key] ).join(' ');
    }
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
