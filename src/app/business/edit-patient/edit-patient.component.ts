import { Patient } from 'src/app/models/LSLABCENTER/Patient';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.css']
})
export class EditPatientComponent implements OnInit {
  @Input('patient') patientSelected: Patient = new Patient();

  constructor() { }

  ngOnInit(): void {
  }

}
