import { Component, OnInit, Input } from '@angular/core';
import { Patient } from 'src/app/models/LSLABCENTER/Patient';

@Component({
  selector: 'app-patient-history-sample-result',
  templateUrl: './patient-history-sample-result.component.html',
  styleUrls: ['./patient-history-sample-result.component.css']
})
export class PatientHistorySampleResultComponent implements OnInit {
  @Input('patient') patient: Patient = new Patient();
  @Input('laboratory_id') laboratory_id: number = 0;
  
  constructor() { }

  ngOnInit(): void {
  }

}
