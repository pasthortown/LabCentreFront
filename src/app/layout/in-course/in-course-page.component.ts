import { PendingWork } from 'src/app/models/LSLABCENTER/PendingWork';
import { Component, OnInit } from '@angular/core';
import { SampleService } from 'src/app/services/CRUD/LSLABCENTER/sample.service';
import { Sample } from 'src/app/models/LSLABCENTER/Sample';
import { Patient } from 'src/app/models/LSLABCENTER/Patient';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-in-course-page',
  templateUrl: './in-course-page.component.html',
  styleUrls: ['./in-course-page.component.scss']
})
export class InCoursePageComponent implements OnInit {
  selected_sample_id = 0;
  pending_works: PendingWork[] = [];
  laboratory_id = 1;
  sample_selected = new Sample();
  patient_selected = new Patient();

  constructor(private spinner: NgxSpinnerService, private sampleDataService: SampleService) {
    
  }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.selected_sample_id = 0;
    this.pending_works = [];
    this.laboratory_id = 1;
    this.sample_selected = new Sample();
    this.patient_selected = new Patient();
    this.look_for_pending_work();
  }

  look_for_pending_work() {
    this.spinner.show();
    this.sampleDataService.look_for_pending_work(this.laboratory_id).then( r => {
      this.spinner.hide();
      this.pending_works = r as PendingWork[];
    }).catch( e => { console.log(e); });
  }

  selectSample() {
    this.pending_works.forEach(element => {
      if (element.sample.id == this.selected_sample_id) {
        this.sample_selected = element.sample;
        this.patient_selected = element.patient;
        let born_date = new Date(element.patient.born_date).getTime();
        let now = new Date().getTime();
        let age = (now - born_date) / (365*24*60*60*1000);
        this.patient_selected.age = Math.floor(age);
      }
    });
  }

  sample_saved(event) {
    this.refresh();
  }
  
}
