import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResultAttachmentRoutingModule } from './resultattachment-routing.module';
import { ResultAttachmentComponent } from './resultattachment.component';
import { ResultAttachmentService } from 'src/app/services/CRUD/LSLABCENTER/resultattachment.service';
import { environment } from 'src/environments/environment';

@NgModule({
   imports: [CommonModule,
             ResultAttachmentRoutingModule,
             FormsModule],
   declarations: [ResultAttachmentComponent],
   providers: [
               NgbModal,
               ResultAttachmentService
               ]
})
export class ResultAttachmentModule {}