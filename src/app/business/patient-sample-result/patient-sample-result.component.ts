import { Patient } from 'src/app/models/LSLABCENTER/Patient';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-patient-sample-result',
  templateUrl: './patient-sample-result.component.html',
  styleUrls: ['./patient-sample-result.component.css']
})
export class PatientSampleResultComponent implements OnInit {
  @Input('patient') patient: Patient = new Patient();
  @Input('laboratory_id') laboratory_id: number = 0;

  constructor() { }

  ngOnInit(): void {
  }
}
