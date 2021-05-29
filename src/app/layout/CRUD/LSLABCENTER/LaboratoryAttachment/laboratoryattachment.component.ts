import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { Laboratory } from 'src/app/models/LSLABCENTER/Laboratory';
import { LaboratoryService } from 'src/app/services/CRUD/LSLABCENTER/laboratory.service';

@Component({
   selector: 'app-laboratoryattachment',
   templateUrl: './laboratoryattachment.component.html',
   styleUrls: ['./laboratoryattachment.component.scss']
})
export class LaboratoryAttachmentComponent implements OnInit {
   laboratory_id = 0;
   laboratories: Laboratory[] = [];

   constructor(
               private spinner: NgxSpinnerService,
               private laboratoryDataService: LaboratoryService) {}

   ngOnInit() {
      this.spinner.show();
      this.getLaboratories();
   }

   getLaboratories() {
      this.laboratoryDataService.get().then( r => {
         this.laboratories = r as Laboratory[];
         this.spinner.hide();
      }).catch( e => { console.log(e); });
   }
}