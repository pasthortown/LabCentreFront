import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { NgxSpinnerModule } from "ngx-spinner";
import { TemplateService } from 'src/app/services/CRUD/LSLABCENTER/template.service';
import { TemplatesOfLaboratoryComponent } from './templates-of-laboratory.component';

@NgModule({
  declarations: [TemplatesOfLaboratoryComponent],
  imports: [
    CommonModule,
    FormsModule,
    CodemirrorModule,
    NgxSpinnerModule
  ],
  exports: [
    TemplatesOfLaboratoryComponent
  ],
  providers: [
    NgbModal,
    TemplateService,
  ]
})
export class TemplatesOfLaboratoryModule { }
