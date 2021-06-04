import { PatientHistorySampleResultModule } from './../patient-history-sample-result/patient-history-sample-result.module';
import { PatientNewSampleResultModule } from './../patient-new-sample-result/patient-new-sample-result.module';
import { PatientSampleResultComponent } from './patient-sample-result.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [PatientSampleResultComponent],
  imports: [
    CommonModule,
    NgbModule,
    PatientNewSampleResultModule,
    PatientHistorySampleResultModule,
  ],
  exports: [
    PatientSampleResultComponent
  ]
})
export class PatientSampleResultModule { }
