import { Component, OnInit } from '@angular/core';
import { Laboratory } from 'src/app/models/LSLABCENTER/Laboratory';
import { LaboratoryService } from 'src/app/services/CRUD/LSLABCENTER/laboratory.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
   selector: 'app-template',
   templateUrl: './template.component.html',
   styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
   laboratories: Laboratory[] = [];
   laboratorySelected: Laboratory = new Laboratory();
   laboratory_id = 0;
   
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

   getLaboratorySelected() {
      this.laboratories.forEach(element => {
         if (element.id == this.laboratory_id) {
            this.laboratorySelected = element;
         }
      });
   }  
}