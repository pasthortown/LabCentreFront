import { LaboratoryAdminAttachmentsModule } from './../../../../business/laboratory-admin-attachments/laboratory-admin-attachments.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LaboratoryAttachmentRoutingModule } from './laboratoryattachment-routing.module';
import { LaboratoryAttachmentComponent } from './laboratoryattachment.component';
import { environment } from 'src/environments/environment';
import { LaboratoryAttachmentService } from 'src/app/services/CRUD/LSLABCENTER/laboratoryattachment.service';
import { LaboratoryService } from 'src/app/services/CRUD/LSLABCENTER/laboratory.service';
import { NgxSpinnerModule } from "ngx-spinner";
@NgModule({
   imports: [CommonModule,
             LaboratoryAttachmentRoutingModule,
             NgxSpinnerModule,
             LaboratoryAdminAttachmentsModule,
             FormsModule],
   declarations: [LaboratoryAttachmentComponent],
   providers: [
               NgbModal,
               LaboratoryService,
               LaboratoryAttachmentService
               ]
})
export class LaboratoryAttachmentModule {}