import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { ResultService } from 'src/app/services/CRUD/LSLABCENTER/result.service';
import { Result } from 'src/app/models/LSLABCENTER/Result';

@Component({
   selector: 'app-result',
   templateUrl: './result.component.html',
   styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
   results: Result[] = [];
   resultSelected: Result = new Result();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private resultDataService: ResultService) {}

   ngOnInit() {
      this.goToPage(1);
   }

   selectResult(result: Result) {
      this.resultSelected = result;
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getResults();
   }

   getResults() {
      this.results = [];
      this.resultSelected = new Result();
      this.resultDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.results = r.data as Result[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newResult(content) {
      this.resultSelected = new Result();
      this.openDialog(content);
   }

   editResult(content) {
      if (typeof this.resultSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteResult() {
      if (typeof this.resultSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.resultDataService.delete(this.resultSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getResults();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.resultDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain;charset=utf-8' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Results.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.resultDataService.get().then( r => {
         const backupData = r as Result[];
         let output = 'id;sample_id;description\n';
         backupData.forEach(element => {
            output += element.id + ';' + element.sample_id + ';' + element.description + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Results.csv');
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
            this.resultDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.resultSelected.id === 'undefined') {
               this.resultDataService.post(this.resultSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getResults();
               }).catch( e => console.log(e) );
            } else {
               this.resultDataService.put(this.resultSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getResults();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}