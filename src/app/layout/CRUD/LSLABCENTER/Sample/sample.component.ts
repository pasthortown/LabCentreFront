import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { SampleService } from 'src/app/services/CRUD/LSLABCENTER/sample.service';
import { Sample } from 'src/app/models/LSLABCENTER/Sample';
import { SampleParam } from 'src/app/models/LSLABCENTER/SampleParam';

@Component({
   selector: 'app-sample',
   templateUrl: './sample.component.html',
   styleUrls: ['./sample.component.scss']
})
export class SampleComponent implements OnInit {
   samples: Sample[] = [];
   sampleSelected: Sample = new Sample();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private sampleDataService: SampleService) {}

   ngOnInit() {
      this.goToPage(1);
   }

   selectSample(sample: Sample) {
      this.sampleSelected = sample;
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getSamples();
   }

   getSamples() {
      this.samples = [];
      this.sampleSelected = new Sample();
      this.sampleDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.samples = r.data as Sample[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newSample(content) {
      this.sampleSelected = new Sample();
      this.openDialog(content);
   }

   editSample(content) {
      if (typeof this.sampleSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteSample() {
      if (typeof this.sampleSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.sampleDataService.delete(this.sampleSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getSamples();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.sampleDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain;charset=utf-8' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Samples.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.sampleDataService.get().then( r => {
         const backupData = r as Sample[];
         let output = 'id;patient_id;description;acquisition_date;status;laboratory_id\n';
         backupData.forEach(element => {
            output += element.id + ';' + element.patient_id + ';' + element.description + ';' + element.acquisition_date + ';' + element.status + ';' + element.laboratory_id + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Samples.csv');
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
            this.sampleDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.sampleSelected.id === 'undefined') {
               this.sampleDataService.post(this.sampleSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getSamples();
               }).catch( e => console.log(e) );
            } else {
               this.sampleDataService.put(this.sampleSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getSamples();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}