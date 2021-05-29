import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResultParamRoutingModule } from './resultparam-routing.module';
import { ResultParamComponent } from './resultparam.component';
import { ResultParamService } from 'src/app/services/CRUD/LSLABCENTER/resultparam.service';
import { environment } from 'src/environments/environment';

@NgModule({
   imports: [CommonModule,
             ResultParamRoutingModule,
             FormsModule],
   declarations: [ResultParamComponent],
   providers: [
               NgbModal,
               ResultParamService
               ]
})
export class ResultParamModule {}