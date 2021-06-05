import { FormsModule } from '@angular/forms';
import { PatientNewSampleResultModule } from './../../business/patient-new-sample-result/patient-new-sample-result.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SampleService } from 'src/app/services/CRUD/LSLABCENTER/sample.service';
import { InCoursePageRoutingModule } from './in-course-page-routing.module';
import { InCoursePageComponent } from './in-course-page.component';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  imports: [CommonModule, NgxSpinnerModule, FormsModule, InCoursePageRoutingModule, PatientNewSampleResultModule],
  declarations: [InCoursePageComponent],
  providers: [SampleService]
})
export class InCoursePageModule {}
