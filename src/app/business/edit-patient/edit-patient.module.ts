import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditPatientComponent } from './edit-patient.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [EditPatientComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    EditPatientComponent
  ]
})
export class EditPatientModule { }
