import { EditPatientModule } from './../../../../business/edit-patient/edit-patient.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PatientRoutingModule } from './patient-routing.module';
import { PatientComponent } from './patient.component';
import { PatientService } from 'src/app/services/CRUD/LSLABCENTER/patient.service';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
   imports: [CommonModule,
             NgxSpinnerModule,
             PatientRoutingModule,
             FormsModule,
             ReactiveFormsModule,
             EditPatientModule
            ],
   declarations: [PatientComponent],
   providers: [
               NgbModal,
               PatientService
            ]
})
export class PatientModule {}