import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SendDocumentsPageRoutingModule } from './send-documents-page-routing.module';
import { SendDocumentsPageComponent } from './send-documents-page.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { SampleService } from 'src/app/services/CRUD/LSLABCENTER/sample.service';
import { TemplateService } from 'src/app/services/CRUD/LSLABCENTER/template.service';
import { ResultAttachmentService } from 'src/app/services/CRUD/LSLABCENTER/resultattachment.service';

@NgModule({
  imports: [CommonModule, SendDocumentsPageRoutingModule, NgxSpinnerModule],
  declarations: [SendDocumentsPageComponent],
  providers: [SampleService, ResultAttachmentService, TemplateService]
})
export class SendDocumentsPageModule {}
