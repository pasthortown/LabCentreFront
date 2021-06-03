import { ToastrManager } from 'ng6-toastr-notifications';
import { Component, OnInit } from '@angular/core';
import { Laboratory } from 'src/app/models/LSLABCENTER/Laboratory';
import { LaboratoryService } from 'src/app/services/CRUD/LSLABCENTER/laboratory.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-my-templates-page',
  templateUrl: './my-templates-page.component.html',
  styleUrls: ['./my-templates-page.component.scss']
})
export class MyTemplatesPageComponent implements OnInit {
  laboratorySelected: Laboratory = new Laboratory();

  constructor(
    private spinner: NgxSpinnerService,
    private laboratoryDataService: LaboratoryService    
  ) {}

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.get_laboratory();
  }

  get_laboratory() {
    this.spinner.show();
    this.laboratoryDataService.get(1).then( r => { 
      this.laboratorySelected = r as Laboratory;
      this.spinner.hide();
    }).catch( e => {console.log(e); });
  }
}
