import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MyLaboratoryPageRoutingModule } from './my-laboratory-page-routing.module';
import { MyLaboratoryPageComponent } from './my-laboratory-page.component';

import { LaboratoryService } from 'src/app/services/CRUD/LSLABCENTER/laboratory.service';
import { environment } from 'src/environments/environment';
import { AgmCoreModule } from '@agm/core';
import { NgxSpinnerModule } from "ngx-spinner";

import { LaboratoryAdminAttachmentsModule } from './../../business/laboratory-admin-attachments/laboratory-admin-attachments.module';

@NgModule({
  imports: [CommonModule, 
            MyLaboratoryPageRoutingModule, 
            AgmCoreModule.forRoot({apiKey: environment.gmapapiKey}),
            FormsModule,
            NgxSpinnerModule,
            LaboratoryAdminAttachmentsModule],
  declarations: [MyLaboratoryPageComponent],
  providers: [LaboratoryService]
})
export class MyLaboratoryPageModule {}
