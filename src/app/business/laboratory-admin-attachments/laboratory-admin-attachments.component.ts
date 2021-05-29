import { Component, OnInit, Input } from '@angular/core';
import { LaboratoryAttachmentService } from 'src/app/services/CRUD/LSLABCENTER/laboratoryattachment.service';
import { LaboratoryService } from 'src/app/services/CRUD/LSLABCENTER/laboratory.service';
import { LaboratoryAttachment } from 'src/app/models/LSLABCENTER/LaboratoryAttachment';
import { Laboratory } from 'src/app/models/LSLABCENTER/Laboratory';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-laboratory-admin-attachments',
  templateUrl: './laboratory-admin-attachments.component.html',
  styleUrls: ['./laboratory-admin-attachments.component.css']
})
export class LaboratoryAdminAttachmentsComponent implements OnInit {
  
  @Input('laboratory_id') laboratory_id = 0;
  laboratory_attachments: LaboratoryAttachment[] = [];
  laboratory_attachmentSelected: LaboratoryAttachment = new LaboratoryAttachment();
  laboratory: Laboratory = new Laboratory();

  currentPage = 1;
  lastPage = 1;
  showDialog = false;
  recordsByPage = 5;

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrManager,
    private spinner: NgxSpinnerService,
    private laboratoryDataService: LaboratoryService,
    private laboratory_attachmentDataService: LaboratoryAttachmentService) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
   this.load_laboratory_data();
   this.goToPage(1);
  }

  load_laboratory_data() {
   this.laboratoryDataService.get(this.laboratory_id).then( r => {
      this.laboratory = r as Laboratory;
   }).catch( e => { console.log(e); });
  }

  CodeFileLaboratoryAttachment(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
       const file = event.target.files[0];
       reader.readAsDataURL(file);
       reader.onload = () => {
          this.laboratory_attachmentSelected.laboratory_attachment_file_name = file.name;
          this.laboratory_attachmentSelected.laboratory_attachment_file_type = file.type;
          this.laboratory_attachmentSelected.laboratory_attachment_file = reader.result.toString().split(',')[1];
       };
    }
 }

 selectLaboratoryAttachment(laboratory_attachment: LaboratoryAttachment) {
    this.laboratory_attachmentSelected = laboratory_attachment;
 }

 goToPage(page: number) {
    if ( page < 1 || page > this.lastPage ) {
       this.toastr.errorToastr('La página solicitada no existe.', 'Error');
       return;
    }
    this.currentPage = page;
    this.getLaboratoryAttachments();
 }

 getLaboratoryAttachments() {
   this.spinner.show();
    this.laboratory_attachments = [];
    this.laboratory_attachmentSelected = new LaboratoryAttachment();
    this.laboratory_attachmentDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
       this.laboratory_attachments = r.data as LaboratoryAttachment[];
       this.lastPage = r.last_page;
       this.spinner.hide();
    }).catch( e => console.log(e) );
 }

 newLaboratoryAttachment(content) {
    this.laboratory_attachmentSelected = new LaboratoryAttachment();
    this.laboratory_attachmentSelected.laboratory_id = this.laboratory_id;
    this.openDialog(content);
 }

 editLaboratoryAttachment(content) {
    if (typeof this.laboratory_attachmentSelected.id === 'undefined') {
       this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
       return;
    }
    this.openDialog(content);
 }

 deleteLaboratoryAttachment() {
    if (typeof this.laboratory_attachmentSelected.id === 'undefined') {
       this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
       return;
    }
    this.laboratory_attachmentDataService.delete(this.laboratory_attachmentSelected.id).then( r => {
       this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
       this.getLaboratoryAttachments();
    }).catch( e => console.log(e) );
 }

 backup() {
    this.laboratory_attachmentDataService.getBackUp().then( r => {
       const backupData = r;
       const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain;charset=utf-8' });
       const fecha = new Date();
       saveAs(blob, fecha.toLocaleDateString() + '_LaboratoryAttachments.json');
    }).catch( e => console.log(e) );
 }

 toCSV() {
    this.laboratory_attachmentDataService.get().then( r => {
       const backupData = r as LaboratoryAttachment[];
       let output = 'id;laboratory_id;laboratory_attachment_file_type;laboratory_attachment_file_name;laboratory_attachment_file\n';
       backupData.forEach(element => {
          output += element.id + ';' + element.laboratory_id + ';' + element.laboratory_attachment_file_type + ';' + element.laboratory_attachment_file_name + ';' + element.laboratory_attachment_file + '\n';
       });
       const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
       const fecha = new Date();
       saveAs(blob, fecha.toLocaleDateString() + '_LaboratoryAttachments.csv');
    }).catch( e => console.log(e) );
 }

 decodeUploadFile(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
       const file = event.target.files[0];
       reader.readAsDataURL(file);
       reader.onload = () => {
          const fileBytes = reader.result.toString().split(',')[1];
          const newData = JSON.parse(decodeURIComponent(escape(atob(fileBytes)))) as any[];
          this.laboratory_attachmentDataService.masiveLoad(newData).then( r => {
             this.goToPage(this.currentPage);
          }).catch( e => console.log(e) );
       };
    }
 }

 downloadFile(file: string, type: string, name: string) {
    const byteCharacters = atob(file);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
       byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: type});
    saveAs(blob, name);
 }

 openDialog(content) {
    this.modalService.open(content, { centered: true , size: 'lg' }).result.then(( response => {
       if ( response === 'Guardar click' ) {
          if (typeof this.laboratory_attachmentSelected.id === 'undefined') {
             this.laboratory_attachmentDataService.post(this.laboratory_attachmentSelected).then( r => {
                this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                this.getLaboratoryAttachments();
             }).catch( e => console.log(e) );
          } else {
             this.laboratory_attachmentDataService.put(this.laboratory_attachmentSelected).then( r => {
                this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                this.getLaboratoryAttachments();
             }).catch( e => console.log(e) );
          }
       }
    }), ( r => {}));
  }

}
