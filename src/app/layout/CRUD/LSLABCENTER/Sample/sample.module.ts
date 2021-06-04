import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SampleRoutingModule } from './sample-routing.module';
import { SampleComponent } from './sample.component';
import { SampleService } from 'src/app/services/CRUD/LSLABCENTER/sample.service';
import { environment } from 'src/environments/environment';

@NgModule({
   imports: [CommonModule,
             SampleRoutingModule,
             FormsModule],
   declarations: [SampleComponent],
   providers: [
               NgbModal,
               SampleService
               ]
})
export class SampleModule {}