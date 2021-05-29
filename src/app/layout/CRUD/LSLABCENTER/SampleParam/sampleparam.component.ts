import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { SampleParamService } from 'src/app/services/CRUD/LSLABCENTER/sampleparam.service';
import { SampleParam } from 'src/app/models/LSLABCENTER/SampleParam';

@Component({
   selector: 'app-sampleparam',
   templateUrl: './sampleparam.component.html',
   styleUrls: ['./sampleparam.component.scss']
})
export class SampleParamComponent implements OnInit {
   sample_params: SampleParam[] = [];
   sample_paramSelected: SampleParam = new SampleParam();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private sample_paramDataService: SampleParamService) {}

   ngOnInit() {
      this.goToPage(1);
   }

   selectSampleParam(sample_param: SampleParam) {
      this.sample_paramSelected = sample_param;
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getSampleParams();
   }

   getSampleParams() {
      this.sample_params = [];
      this.sample_paramSelected = new SampleParam();
      this.sample_paramDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.sample_params = r.data as SampleParam[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newSampleParam(content) {
      this.sample_paramSelected = new SampleParam();
      this.openDialog(content);
   }

   editSampleParam(content) {
      if (typeof this.sample_paramSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteSampleParam() {
      if (typeof this.sample_paramSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.sample_paramDataService.delete(this.sample_paramSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getSampleParams();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.sample_paramDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain;charset=utf-8' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_SampleParams.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.sample_paramDataService.get().then( r => {
         const backupData = r as SampleParam[];
         let output = 'id;sample_id;description;value_text;value_double\n';
         backupData.forEach(element => {
            output += element.id + ';' + element.sample_id + ';' + element.description + ';' + element.value_text + ';' + element.value_double + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_SampleParams.csv');
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
            this.sample_paramDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.sample_paramSelected.id === 'undefined') {
               this.sample_paramDataService.post(this.sample_paramSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getSampleParams();
               }).catch( e => console.log(e) );
            } else {
               this.sample_paramDataService.put(this.sample_paramSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getSampleParams();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}