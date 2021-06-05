import { FormsModule } from '@angular/forms';
import { PatientNewSampleResultComponent } from './patient-new-sample-result.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateService } from 'src/app/services/CRUD/LSLABCENTER/template.service';
import { SampleService } from 'src/app/services/CRUD/LSLABCENTER/sample.service';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [PatientNewSampleResultComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxSpinnerModule
  ],
  exports: [PatientNewSampleResultComponent],
  providers: [TemplateService, SampleService]
})
export class PatientNewSampleResultModule { }
