import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { LaboratoryService } from 'src/app/services/CRUD/LSLABCENTER/laboratory.service';
import { Laboratory } from 'src/app/models/LSLABCENTER/Laboratory';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
   selector: 'app-laboratory',
   templateUrl: './laboratory.component.html',
   styleUrls: ['./laboratory.component.scss']
})
export class LaboratoryComponent implements OnInit {
   laboratories: Laboratory[] = [];
   laboratorySelected: Laboratory = new Laboratory();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private spinner: NgxSpinnerService,
               private laboratoryDataService: LaboratoryService) {}

   ngOnInit() {
      this.goToPage(1);
   }

   selectLaboratory(laboratory: Laboratory) {
      this.laboratorySelected = laboratory;
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getLaboratories();
   }

   geolocationEvent(event) {
      this.laboratorySelected.geolocation.coordinates[1] = event.coords.lat;
      this.laboratorySelected.geolocation.coordinates[0] = event.coords.lng;
   }

   getLaboratories() {
      this.spinner.show();
      this.laboratories = [];
      this.laboratorySelected = new Laboratory();
      this.laboratoryDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.laboratories = r.data as Laboratory[];
         this.lastPage = r.last_page;
         this.spinner.hide();
      }).catch( e => console.log(e) );
   }

   newLaboratory(content) {
      this.laboratorySelected = new Laboratory();
      this.openDialog(content);
   }

   editLaboratory(content) {
      if (typeof this.laboratorySelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteLaboratory() {
      if (typeof this.laboratorySelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.laboratoryDataService.delete(this.laboratorySelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getLaboratories();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.laboratoryDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain;charset=utf-8' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Laboratories.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.laboratoryDataService.get().then( r => {
         const backupData = r as Laboratory[];
         let output = 'id;description;address;geolocation.coordinates[1];geolocation.coordinates[0]\n';
         backupData.forEach(element => {
            output += element.id + ';' + element.description + ';' + element.address + ';' + element.geolocation.coordinates[1] + ';' + element.geolocation.coordinates[0] + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Laboratories.csv');
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
            this.laboratoryDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true, size: 'lg' }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.laboratorySelected.id === 'undefined') {
               this.laboratoryDataService.post(this.laboratorySelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getLaboratories();
               }).catch( e => console.log(e) );
            } else {
               this.laboratoryDataService.put(this.laboratorySelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getLaboratories();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}