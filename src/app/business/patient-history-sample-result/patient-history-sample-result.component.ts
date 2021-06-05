import { Component, OnInit, Input } from '@angular/core';
import { Patient } from 'src/app/models/LSLABCENTER/Patient';
import { PendingWork } from 'src/app/models/LSLABCENTER/PendingWork';
import { saveAs } from 'file-saver/FileSaver';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ResultAttachment } from 'src/app/models/LSLABCENTER/ResultAttachment';
import { ResultAttachmentService } from 'src/app/services/CRUD/LSLABCENTER/resultattachment.service';
import { NgxSpinnerService } from "ngx-spinner";
import { SampleService } from 'src/app/services/CRUD/LSLABCENTER/sample.service';

@Component({
  selector: 'app-patient-history-sample-result',
  templateUrl: './patient-history-sample-result.component.html',
  styleUrls: ['./patient-history-sample-result.component.css']
})
export class PatientHistorySampleResultComponent implements OnInit {
  @Input('patient') patient: Patient = new Patient();
  @Input('laboratory_id') laboratory_id: number = 0;
  
  works_history: PendingWork[] = [];

  constructor( private toastr: ToastrManager,
              private spinner: NgxSpinnerService, 
              private sampleDataService: SampleService,
              private resultAttachmentDataService: ResultAttachmentService)
   { }

  ngOnInit(): void {
    this.spinner.show();
    this.sampleDataService.look_for_history_work(this.patient.id, this.laboratory_id).then( r => {
      this.spinner.hide();
      this.works_history = r as PendingWork[];
      this.works_history.sort((d1,d2)=> {
        let date1 = this.processDateFromBDD(d1.sample.acquisition_date.toString());
        let date2 = this.processDateFromBDD(d2.sample.acquisition_date.toString());
        if (date1.getTime() > date2.getTime()) {
          return 1;
        }
        if (date1.getTime() < date2.getTime()) {
          return -1;
        }
        return 0;
      });
    }).catch( e => { console.log(e); });
  }

  processDateFromBDD(date_bdd: String): Date {
    return new Date(date_bdd.toString());
  }
  
  print(work_history: PendingWork) {
    this.spinner.show();
    this.resultAttachmentDataService.get_by_sample_id(work_history.sample.id).then( r => {
        let result_attachment = r as ResultAttachment;
        const byteCharacters = atob(result_attachment.result_attachment_file.toString());
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: result_attachment.result_attachment_file_type.toString()});
        saveAs(blob, result_attachment.result_attachment_file_name.toString());
        this.spinner.hide();
    }).catch( e => { console.log(e); });
  }

  send(work_history: PendingWork) {
    this.spinner.show();
    this.resultAttachmentDataService.send(work_history.patient, work_history.sample).then( r => {
      this.spinner.hide();
      this.toastr.successToastr('Resultados Enviados Satisfactoriamente', 'Resultados Enviados');
    }).catch(e => { console.log(e); });
  }
}
