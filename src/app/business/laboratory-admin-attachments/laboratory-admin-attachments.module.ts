import { LaboratoryAdminAttachmentsComponent } from './laboratory-admin-attachments.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LaboratoryAttachmentService } from 'src/app/services/CRUD/LSLABCENTER/laboratoryattachment.service';
import { LaboratoryService } from 'src/app/services/CRUD/LSLABCENTER/laboratory.service';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [LaboratoryAdminAttachmentsComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxSpinnerModule
  ],
  exports: [
    LaboratoryAdminAttachmentsComponent
  ],
  providers: [
    LaboratoryAttachmentService,
    LaboratoryService
  ]
})
export class LaboratoryAdminAttachmentsModule { }
