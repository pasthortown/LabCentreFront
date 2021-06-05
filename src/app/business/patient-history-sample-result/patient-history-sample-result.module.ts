import { FormsModule } from '@angular/forms';
import { PatientHistorySampleResultComponent } from './patient-history-sample-result.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";
import { SampleService } from 'src/app/services/CRUD/LSLABCENTER/sample.service';
import { ResultAttachmentService } from 'src/app/services/CRUD/LSLABCENTER/resultattachment.service';

@NgModule({
  declarations: [PatientHistorySampleResultComponent],
  imports: [
    CommonModule, FormsModule, NgxSpinnerModule
  ],
  exports: [PatientHistorySampleResultComponent],
  providers: [SampleService, ResultAttachmentService]
})
export class PatientHistorySampleResultModule { }
