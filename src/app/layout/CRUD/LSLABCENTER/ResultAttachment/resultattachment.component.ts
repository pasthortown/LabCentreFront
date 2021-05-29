import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { ResultAttachmentService } from 'src/app/services/CRUD/LSLABCENTER/resultattachment.service';
import { ResultAttachment } from 'src/app/models/LSLABCENTER/ResultAttachment';

@Component({
   selector: 'app-resultattachment',
   templateUrl: './resultattachment.component.html',
   styleUrls: ['./resultattachment.component.scss']
})
export class ResultAttachmentComponent implements OnInit {
   result_attachments: ResultAttachment[] = [];
   result_attachmentSelected: ResultAttachment = new ResultAttachment();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private result_attachmentDataService: ResultAttachmentService) {}

   ngOnInit() {
      this.goToPage(1);
   }

   CodeFileResultAttachment(event) {
      const reader = new FileReader();
      if (event.target.files && event.target.files.length > 0) {
         const file = event.target.files[0];
         reader.readAsDataURL(file);
         reader.onload = () => {
            this.result_attachmentSelected.result_attachment_file_name = file.name;
            this.result_attachmentSelected.result_attachment_file_type = file.type;
            this.result_attachmentSelected.result_attachment_file = reader.result.toString().split(',')[1];
         };
      }
   }

   selectResultAttachment(result_attachment: ResultAttachment) {
      this.result_attachmentSelected = result_attachment;
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getResultAttachments();
   }

   getResultAttachments() {
      this.result_attachments = [];
      this.result_attachmentSelected = new ResultAttachment();
      this.result_attachmentDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.result_attachments = r.data as ResultAttachment[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newResultAttachment(content) {
      this.result_attachmentSelected = new ResultAttachment();
      this.openDialog(content);
   }

   editResultAttachment(content) {
      if (typeof this.result_attachmentSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteResultAttachment() {
      if (typeof this.result_attachmentSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.result_attachmentDataService.delete(this.result_attachmentSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getResultAttachments();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.result_attachmentDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain;charset=utf-8' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_ResultAttachments.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.result_attachmentDataService.get().then( r => {
         const backupData = r as ResultAttachment[];
         let output = 'id;result_id;result_attachment_file_type;result_attachment_file_name;result_attachment_file\n';
         backupData.forEach(element => {
            output += element.id + ';' + element.result_id + ';' + element.result_attachment_file_type + ';' + element.result_attachment_file_name + ';' + element.result_attachment_file + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_ResultAttachments.csv');
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
            this.result_attachmentDataService.masiveLoad(newData).then( r => {
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
            if (typeof this.result_attachmentSelected.id === 'undefined') {
               this.result_attachmentDataService.post(this.result_attachmentSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getResultAttachments();
               }).catch( e => console.log(e) );
            } else {
               this.result_attachmentDataService.put(this.result_attachmentSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getResultAttachments();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}