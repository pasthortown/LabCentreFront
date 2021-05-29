import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SampleParamRoutingModule } from './sampleparam-routing.module';
import { SampleParamComponent } from './sampleparam.component';
import { SampleParamService } from 'src/app/services/CRUD/LSLABCENTER/sampleparam.service';
import { environment } from 'src/environments/environment';

@NgModule({
   imports: [CommonModule,
             SampleParamRoutingModule,
             FormsModule],
   declarations: [SampleParamComponent],
   providers: [
               NgbModal,
               SampleParamService
               ]
})
export class SampleParamModule {}