import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,    ReactiveFormsModule} from '@angular/forms'
import {HttpModule} from '@angular/http'


import { AppComponent } from './app.component';
import { ReactiveFormExample1Component } from './reactive-form-example1/reactive-form-example1.component';
import { DoctorComponent } from './doctor/doctor.component';
import { ReactiveFormExample2Component } from './reactive-form-example2/reactive-form-example2.component';
import { ProductComponent } from './product/product.component';
import { FormControlExComponent } from './form-control-ex/form-control-ex.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { DoctorFormComponent } from './doctor-form/doctor-form.component';
import { RecipesComponent } from './recipes/recipes.component';
import { JproductComponent } from './jproduct/jproduct.component';


@NgModule({
  declarations: [
    AppComponent,
    ReactiveFormExample1Component,
    DoctorComponent,
    ReactiveFormExample2Component,
    ProductComponent,
    FormControlExComponent,
    FormBuilderComponent,
    DoctorFormComponent,
    RecipesComponent,
    JproductComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
        ReactiveFormsModule,
        HttpModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
