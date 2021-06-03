import { TemplatesOfLaboratoryModule } from './../../business/templates-of-laboratory/templates-of-laboratory.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MyTemplatesPageRoutingModule } from './my-templates-page-routing.module';
import { MyTemplatesPageComponent } from './my-templates-page.component';

import { NgxSpinnerModule } from "ngx-spinner";
import { LaboratoryService } from 'src/app/services/CRUD/LSLABCENTER/laboratory.service';
import { environment } from 'src/environments/environment';

@NgModule({
  imports: [CommonModule, 
            NgxSpinnerModule,
            MyTemplatesPageRoutingModule, 
            FormsModule,
            TemplatesOfLaboratoryModule],
  declarations: [MyTemplatesPageComponent],
  providers: [LaboratoryService]
})
export class MyTemplatesPageModule {}
