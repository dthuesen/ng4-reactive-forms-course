import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { CustomersComponent } from './customers/customers.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
