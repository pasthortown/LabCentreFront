import { TemplatesOfLaboratoryModule } from './../../../../business/templates-of-laboratory/templates-of-laboratory.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TemplateRoutingModule } from './template-routing.module';
import { TemplateComponent } from './template.component';
import { environment } from 'src/environments/environment';
import { NgxSpinnerModule } from "ngx-spinner";
import { LaboratoryService } from 'src/app/services/CRUD/LSLABCENTER/laboratory.service';

@NgModule({
   imports: [CommonModule,
             TemplateRoutingModule,
             NgxSpinnerModule,
             TemplatesOfLaboratoryModule,
             FormsModule],
   declarations: [TemplateComponent],
   providers: [
               LaboratoryService
            ]
})
export class TemplateModule {}