import { FormsModule } from '@angular/forms';
import { PatientNewSampleResultComponent } from './patient-new-sample-result.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateService } from 'src/app/services/CRUD/LSLABCENTER/template.service';



@NgModule({
  declarations: [PatientNewSampleResultComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [PatientNewSampleResultComponent],
  providers: [TemplateService]
})
export class PatientNewSampleResultModule { }
