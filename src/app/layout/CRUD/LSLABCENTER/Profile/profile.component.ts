import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { ProfileService } from 'src/app/services/CRUD/LSLABCENTER/profile.service';
import { Profile } from 'src/app/models/LSLABCENTER/Profile';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
   selector: 'app-profile',
   templateUrl: './profile.component.html',
   styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
   profiles: Profile[] = [];
   profileSelected: Profile = new Profile();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private spinner: NgxSpinnerService,
               private profileDataService: ProfileService) {}

   ngOnInit() {
      this.spinner.show();
      this.goToPage(1);
   }

   selectProfile(profile: Profile) {
      this.profileSelected = profile;
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getProfiles();
   }

   getProfiles() {
      this.profiles = [];
      this.profileSelected = new Profile();
      this.profileDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.profiles = r.data as Profile[];
         this.lastPage = r.last_page;
         this.spinner.hide();
      }).catch( e => console.log(e) );
   }

   newProfile(content) {
      this.profileSelected = new Profile();
      this.openDialog(content);
   }

   editProfile(content) {
      if (typeof this.profileSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteProfile() {
      if (typeof this.profileSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.profileDataService.delete(this.profileSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getProfiles();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.profileDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain;charset=utf-8' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Profiles.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.profileDataService.get().then( r => {
         const backupData = r as Profile[];
         let output = 'id;description\n';
         backupData.forEach(element => {
            output += element.id + ';' + element.description + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Profiles.csv');
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
            this.profileDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.profileSelected.id === 'undefined') {
               this.profileDataService.post(this.profileSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getProfiles();
               }).catch( e => console.log(e) );
            } else {
               this.profileDataService.put(this.profileSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getProfiles();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}