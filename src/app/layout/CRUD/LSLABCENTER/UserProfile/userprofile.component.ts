import { ProfileService } from 'src/app/services/CRUD/LSLABCENTER/profile.service';
import { UserService } from 'src/app/services/profile/user.service';
import { Profile } from 'src/app/models/LSLABCENTER/Profile';
import { User } from 'src/app/models/profile/User';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { UserProfileService } from 'src/app/services/CRUD/LSLABCENTER/userprofile.service';
import { UserProfile } from 'src/app/models/LSLABCENTER/UserProfile';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
   selector: 'app-userprofile',
   templateUrl: './userprofile.component.html',
   styleUrls: ['./userprofile.component.scss']
})
export class UserProfileComponent implements OnInit {
   user_profiles: UserProfile[] = [];
   user_profileSelected: UserProfile = new UserProfile();
   users: User[] = [];
   profiles: Profile[] = [];
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
               private profileDataService: ProfileService,
               private user_profileDataService: UserProfileService) {}

   ngOnInit() {
      this.goToPage(1);
   }

   selectUserProfile(user_profile: UserProfile) {
      this.user_profileSelected = user_profile;
   }

   search_key_up(event) {
      if (event.key == 'Enter') {
         this.search();
      }
   }

   search() {
      if (this.filter.length >= 3) {
         this.filtered = true;
         this.user_profiles = [];
         this.spinner.show();
         this.user_profileDataService.get_filtered(this.filter).then( r => {
            this.user_profiles = r as UserProfile[];
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
         this.get_profiles();
      }).catch( e => { console.log(e); });   
   }

   get_profiles() {
      this.profileDataService.get().then( r => { 
         this.profiles = r as Profile[];
         this.getUserProfiles();
      }).catch( e => { console.log(e); });
   }

   getUserProfiles() {
      this.user_profiles = [];
      this.user_profileSelected = new UserProfile();
      this.user_profileDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.user_profiles = r.data as UserProfile[];
         this.lastPage = r.last_page;
         this.spinner.hide();
         this.filter = '';
         this.filtered = false;
      }).catch( e => console.log(e) );
   }

   newUserProfile(content) {
      this.user_profileSelected = new UserProfile();
      this.openDialog(content);
   }

   editUserProfile(content) {
      if (typeof this.user_profileSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteUserProfile() {
      if (typeof this.user_profileSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.spinner.show();
      this.user_profileDataService.delete(this.user_profileSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getUserProfiles();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.user_profileDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain;charset=utf-8' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_UserProfiles.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.user_profileDataService.get().then( r => {
         const backupData = r as UserProfile[];
         let output = 'id;user_id;profile_id\n';
         backupData.forEach(element => {
            output += element.id + ';' + element.user_id + ';' + element.profile_id + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_UserProfiles.csv');
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
            this.user_profileDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            this.spinner.show();
            if (typeof this.user_profileSelected.id === 'undefined') {
               this.user_profileDataService.post(this.user_profileSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getUserProfiles();
               }).catch( e => console.log(e) );
            } else {
               this.user_profileDataService.put(this.user_profileSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getUserProfiles();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}