import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResultRoutingModule } from './result-routing.module';
import { ResultComponent } from './result.component';
import { ResultService } from 'src/app/services/CRUD/LSLABCENTER/result.service';
import { environment } from 'src/environments/environment';

@NgModule({
   imports: [CommonModule,
             ResultRoutingModule,
             FormsModule],
   declarations: [ResultComponent],
   providers: [
               NgbModal,
               ResultService
               ]
})
export class ResultModule {}