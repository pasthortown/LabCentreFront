import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LaboratoryRoutingModule } from './laboratory-routing.module';
import { LaboratoryComponent } from './laboratory.component';
import { LaboratoryService } from 'src/app/services/CRUD/LSLABCENTER/laboratory.service';
import { environment } from 'src/environments/environment';
import { AgmCoreModule } from '@agm/core';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
   imports: [CommonModule,
             LaboratoryRoutingModule,
             NgxSpinnerModule,
             AgmCoreModule.forRoot({apiKey: environment.gmapapiKey}),
             FormsModule],
   declarations: [LaboratoryComponent],
   providers: [
               NgbModal,
               LaboratoryService
               ]
})
export class LaboratoryModule {}