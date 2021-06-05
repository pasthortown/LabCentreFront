import { PendingWork } from 'src/app/models/LSLABCENTER/PendingWork';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { SampleService } from 'src/app/services/CRUD/LSLABCENTER/sample.service';
import { ResultAttachmentService } from 'src/app/services/CRUD/LSLABCENTER/resultattachment.service';
import { TemplateService } from 'src/app/services/CRUD/LSLABCENTER/template.service';
import { Sample } from 'src/app/models/LSLABCENTER/Sample';
import { Patient } from 'src/app/models/LSLABCENTER/Patient';
import { ResultAttachment } from 'src/app/models/LSLABCENTER/ResultAttachment';
import { saveAs } from 'file-saver/FileSaver';
import { ToastrManager } from 'ng6-toastr-notifications';


@Component({
  selector: 'app-send-documents-page',
  templateUrl: './send-documents-page.component.html',
  styleUrls: ['./send-documents-page.component.scss']
})
export class SendDocumentsPageComponent implements OnInit {
  works_to_send: PendingWork[] = [];
  sample_selected: Sample = new Sample();
  laboratory_id = 0;

  constructor( private toastr: ToastrManager,
              private spinner: NgxSpinnerService, 
              private sampleDataService: SampleService,
              private resultAttachmentDataService: ResultAttachmentService,
              private templateDataService: TemplateService) {}

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    const userData = JSON.parse(sessionStorage.getItem('user'));
    this.laboratory_id = userData.laboratory_id; 
    this.look_for_send_documents();
  }

  look_for_send_documents() {
    this.spinner.show();
    this.sampleDataService.look_for_send_documents(this.laboratory_id).then( r => {
      this.spinner.hide();
      this.works_to_send = r as PendingWork[];
    }).catch( e => { console.log(e); });
  }

  print(work_to_send: PendingWork) {
    this.spinner.show();
    this.resultAttachmentDataService.get_by_sample_id(work_to_send.sample.id).then( r => {
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

  decodeUploadFile(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
       const file = event.target.files[0];
       reader.readAsDataURL(file);
       reader.onload = () => {
        let new_result_attachment = new ResultAttachment();
        new_result_attachment.result_attachment_file_name = file.name;
        new_result_attachment.result_attachment_file_type = file.type;
        new_result_attachment.result_attachment_file = reader.result.toString().split(',')[1];
        new_result_attachment.sample_id = this.sample_selected.id;
        this.spinner.show();
        this.resultAttachmentDataService.post_by_sample_id(new_result_attachment).then( r => {
          this.toastr.successToastr('Adjunto Actualizado Satisfactoriamente', 'Adjunto Actualizado');
          this.spinner.hide();
        }).catch( e => { console.log(e); });
     };
    }
  }

  print_again(work_to_send: PendingWork) {
    this.spinner.show();   
    let patient = work_to_send.patient;
    let sample = work_to_send.sample;
    let doc_name = patient.identification + '_' + sample.analysys_title + '.pdf';
    doc_name = doc_name.replace(' ','_');
    let born_date = new Date(patient.born_date).getTime();
    let now = new Date().getTime();
    let age = (now - born_date) / (365*24*60*60*1000);
    patient.age = Math.floor(age);
    let params = {
      doc_name: doc_name,
      patient: patient,
      sample: sample,
      laboratory_id: this.laboratory_id
    };
    this.templateDataService.print_sample_result(
      true, 
      params).then( r => {
        const byteCharacters = atob(r);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf'});
        saveAs(blob, doc_name);
        this.spinner.hide();
        this.toastr.successToastr('Documento Impreso Satisfactoriamente', 'Adjunto Actualizado');
    }).catch( e => { console.log(e); });
  }

  send(work_to_send: PendingWork) {
    this.spinner.show();
    this.resultAttachmentDataService.send(work_to_send.patient, work_to_send.sample).then( r => {
      this.spinner.hide();
      this.toastr.successToastr('Resultados Enviados Satisfactoriamente', 'Resultados Enviados');
      this.refresh();
    }).catch(e => { console.log(e); });
  }
}
