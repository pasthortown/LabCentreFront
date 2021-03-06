import { EditPatientModule } from './../../business/edit-patient/edit-patient.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { PatientService } from 'src/app/services/CRUD/LSLABCENTER/patient.service';
import { PatientSampleResultModule } from 'src/app/business/patient-sample-result/patient-sample-result.module';

@NgModule({
    imports: [CommonModule, 
              MainRoutingModule, 
              NgxSpinnerModule,
              EditPatientModule,
              FormsModule,
              ReactiveFormsModule,
              PatientSampleResultModule,
            ],
    declarations: [MainComponent],
    providers: [
        NgbModal,
        PatientService
    ]
})
export class MainModule {}
