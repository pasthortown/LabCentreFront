import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TemplateRoutingModule } from './template-routing.module';
import { TemplateComponent } from './template.component';
import { TemplateService } from 'src/app/services/CRUD/LSLABCENTER/template.service';
import { environment } from 'src/environments/environment';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { NgxSpinnerModule } from "ngx-spinner";
import { LaboratoryService } from 'src/app/services/CRUD/LSLABCENTER/laboratory.service';

@NgModule({
   imports: [CommonModule,
             TemplateRoutingModule,
             CodemirrorModule,
             NgxSpinnerModule,
             FormsModule],
   declarations: [TemplateComponent],
   providers: [
               NgbModal,
               TemplateService,
               LaboratoryService
               ]
})
export class TemplateModule {}