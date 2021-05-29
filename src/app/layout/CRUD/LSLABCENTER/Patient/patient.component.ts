import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { PatientService } from 'src/app/services/CRUD/LSLABCENTER/patient.service';
import { Patient } from 'src/app/models/LSLABCENTER/Patient';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
   selector: 'app-patient',
   templateUrl: './patient.component.html',
   styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
   
   patients: any[] = [];
   patientSelected: Patient = new Patient();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   constructor(
               private spinner: NgxSpinnerService,
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private patientDataService: PatientService) {
   }

   ngOnInit() {
      this.goToPage(1);
   }
  
   save_data(): void {
      if (typeof this.patientSelected.id === 'undefined' || this.patientSelected.id == 0) {
         this.patientDataService.post(this.patientSelected.patient_form.value).then( r => {
            this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
            this.getPatients();
         }).catch( e => console.log(e) );
      } else {
         let patient_data = this.patientSelected.patient_form.value;
         patient_data.id = this.patientSelected.id;
         this.patientDataService.put(patient_data).then( r => {
            this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
            this.getPatients();
         }).catch( e => console.log(e) );
      }
   }

   selectPatient(patient: any) {
      this.patientSelected = new Patient();
      this.patientSelected.id = patient.id;
      this.patientSelected.patient_form.get('identification').setValue(patient.identification);
      this.patientSelected.patient_form.get('fullname').setValue(patient.fullname);
      this.patientSelected.patient_form.get('born_date').setValue(patient.born_date);
      this.patientSelected.patient_form.get('gender').setValue(patient.gender);
      this.patientSelected.patient_form.get('email').setValue(patient.email);
      this.patientSelected.patient_form.get('contact_number').setValue(patient.contact_number);
      this.patientSelected.patient_form.get('address').setValue(patient.address);
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getPatients();
   }

   getPatients() {
      this.spinner.show();
      this.patients = [];
      this.patientSelected = new Patient();
      this.patientDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.patients = r.data as any[];
         this.lastPage = r.last_page;
         this.spinner.hide();
      }).catch( e => console.log(e) );
   }

   newPatient(content) {
      this.patientSelected = new Patient();
      this.openDialog(content);
   }

   editPatient(content) {
      if (typeof this.patientSelected.id === 'undefined' || this.patientSelected.id == 0) {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deletePatient() {
      if (typeof this.patientSelected.id === 'undefined' || this.patientSelected.id == 0) {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.patientDataService.delete(this.patientSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getPatients();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.patientDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain;charset=utf-8' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Patients.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.patientDataService.get().then( r => {
         const backupData = r as Patient[];
         let output = 'id;identification;fullname;born_date;gender;email;contact_number;address\n';
         backupData.forEach(element => {
            output += element.id + ';' + element.identification + ';' + element.fullname + ';' + element.born_date + ';' + element.gender + ';' + element.email + ';' + element.contact_number + ';' + element.address + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Patients.csv');
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
            this.patientDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            this.save_data();
         }
      }), ( r => {}));
   }
}