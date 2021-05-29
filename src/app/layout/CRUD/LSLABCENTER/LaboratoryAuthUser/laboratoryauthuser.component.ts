import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { LaboratoryAuthUserService } from 'src/app/services/CRUD/LSLABCENTER/laboratoryauthuser.service';
import { LaboratoryAuthUser } from 'src/app/models/LSLABCENTER/LaboratoryAuthUser';
import { User } from 'src/app/models/profile/User';
import { Laboratory } from 'src/app/models/LSLABCENTER/Laboratory';
import { UserService } from 'src/app/services/profile/user.service';
import { LaboratoryService } from 'src/app/services/CRUD/LSLABCENTER/laboratory.service';

@Component({
   selector: 'app-laboratoryauthuser',
   templateUrl: './laboratoryauthuser.component.html',
   styleUrls: ['./laboratoryauthuser.component.scss']
})
export class LaboratoryAuthUserComponent implements OnInit {
   laboratory_auth_users: LaboratoryAuthUser[] = [];
   laboratory_auth_userSelected: LaboratoryAuthUser = new LaboratoryAuthUser();
   users: User[] = [];
   laboratories: Laboratory[] = [];
   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   filter = '';
   filtered = false;

   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private spinner: NgxSpinnerService,
               private userDataService: UserService,
               private laboratoryDataService: LaboratoryService,
               private laboratory_auth_userDataService: LaboratoryAuthUserService) {}

   ngOnInit() {
      this.goToPage(1);
   }

   selectLaboratoryAuthUser(laboratory_auth_user: LaboratoryAuthUser) {
      this.laboratory_auth_userSelected = laboratory_auth_user;
   }

   search_key_up(event) {
      if (event.key == 'Enter') {
         this.search();
      }
   }

   search() {
      if (this.filter.length >= 3) {
         this.filtered = true;
         this.laboratory_auth_users = [];
         this.spinner.show();
         this.laboratory_auth_userDataService.get_filtered(this.filter).then( r => {
            this.laboratory_auth_users = r as LaboratoryAuthUser[];
            this.spinner.hide();
         }).catch( e => { console.log(e); });
      }
   }

   goToPage(page: number) {
      this.spinner.show();
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.get_users();
   }

   get_users() {
      this.userDataService.get().then( r => { 
         this.users = r as User[];
         this.get_laboratories();
      }).catch( e => { console.log(e); });   
   }

   get_laboratories() {
      this.laboratoryDataService.get().then( r => { 
         this.laboratories = r as Laboratory[];
         this.getLaboratoryAuthUsers();
      }).catch( e => { console.log(e); });
   }

   getLaboratoryAuthUsers() {
      this.laboratory_auth_users = [];
      this.laboratory_auth_userSelected = new LaboratoryAuthUser();
      this.laboratory_auth_userDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.laboratory_auth_users = r.data as LaboratoryAuthUser[];
         this.lastPage = r.last_page;
         this.spinner.hide();
         this.filter = '';
         this.filtered = false;
      }).catch( e => console.log(e) );
   }

   newLaboratoryAuthUser(content) {
      this.laboratory_auth_userSelected = new LaboratoryAuthUser();
      this.openDialog(content);
   }

   editLaboratoryAuthUser(content) {
      if (typeof this.laboratory_auth_userSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteLaboratoryAuthUser() {
      if (typeof this.laboratory_auth_userSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.laboratory_auth_userDataService.delete(this.laboratory_auth_userSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getLaboratoryAuthUsers();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.laboratory_auth_userDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain;charset=utf-8' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_LaboratoryAuthUsers.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.laboratory_auth_userDataService.get().then( r => {
         const backupData = r as LaboratoryAuthUser[];
         let output = 'id;laboratory_id;user_id\n';
         backupData.forEach(element => {
            output += element.id + ';' + element.laboratory_id + ';' + element.user_id + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_LaboratoryAuthUsers.csv');
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
            this.laboratory_auth_userDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.laboratory_auth_userSelected.id === 'undefined') {
               this.laboratory_auth_userDataService.post(this.laboratory_auth_userSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getLaboratoryAuthUsers();
               }).catch( e => console.log(e) );
            } else {
               this.laboratory_auth_userDataService.put(this.laboratory_auth_userSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getLaboratoryAuthUsers();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}