import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { ResultParamService } from 'src/app/services/CRUD/LSLABCENTER/resultparam.service';
import { ResultParam } from 'src/app/models/LSLABCENTER/ResultParam';

@Component({
   selector: 'app-resultparam',
   templateUrl: './resultparam.component.html',
   styleUrls: ['./resultparam.component.scss']
})
export class ResultParamComponent implements OnInit {
   result_params: ResultParam[] = [];
   result_paramSelected: ResultParam = new ResultParam();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private result_paramDataService: ResultParamService) {}

   ngOnInit() {
      this.goToPage(1);
   }

   selectResultParam(result_param: ResultParam) {
      this.result_paramSelected = result_param;
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getResultParams();
   }

   getResultParams() {
      this.result_params = [];
      this.result_paramSelected = new ResultParam();
      this.result_paramDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.result_params = r.data as ResultParam[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newResultParam(content) {
      this.result_paramSelected = new ResultParam();
      this.openDialog(content);
   }

   editResultParam(content) {
      if (typeof this.result_paramSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteResultParam() {
      if (typeof this.result_paramSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.result_paramDataService.delete(this.result_paramSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getResultParams();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.result_paramDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain;charset=utf-8' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_ResultParams.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.result_paramDataService.get().then( r => {
         const backupData = r as ResultParam[];
         let output = 'id;description;value_text;value_double\n';
         backupData.forEach(element => {
            output += element.id + ';' + element.description + ';' + element.value_text + ';' + element.value_double + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_ResultParams.csv');
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
            this.result_paramDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.result_paramSelected.id === 'undefined') {
               this.result_paramDataService.post(this.result_paramSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getResultParams();
               }).catch( e => console.log(e) );
            } else {
               this.result_paramDataService.put(this.result_paramSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getResultParams();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}