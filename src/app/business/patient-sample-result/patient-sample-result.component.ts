import { Sample } from 'src/app/models/LSLABCENTER/Sample';
import { Patient } from 'src/app/models/LSLABCENTER/Patient';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-patient-sample-result',
  templateUrl: './patient-sample-result.component.html',
  styleUrls: ['./patient-sample-result.component.css']
})
export class PatientSampleResultComponent implements OnInit {
  @Input('patient') patient: Patient = new Patient();
  @Input('laboratory_id') laboratory_id: number = 0;
  @Output('sample_taked') sample_taked: EventEmitter<any> = new EventEmitter<any>();

  sample: Sample = new Sample();

  constructor() { }

  ngOnInit(): void {
  }

  new_sample_taked(event) {
    this.sample_taked.emit(true);
  }
}
