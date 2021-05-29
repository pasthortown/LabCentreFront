import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { TemplateService } from 'src/app/services/CRUD/LSLABCENTER/template.service';
import { Template } from 'src/app/models/LSLABCENTER/Template';

@Component({
   selector: 'app-template',
   templateUrl: './template.component.html',
   styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
   templates: Template[] = [];
   templateSelected: Template = new Template();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private templateDataService: TemplateService) {}

   ngOnInit() {
      this.goToPage(1);
   }

   selectTemplate(template: Template) {
      this.templateSelected = template;
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getTemplates();
   }

   getTemplates() {
      this.templates = [];
      this.templateSelected = new Template();
      this.templateDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.templates = r.data as Template[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newTemplate(content) {
      this.templateSelected = new Template();
      this.openDialog(content);
   }

   editTemplate(content) {
      if (typeof this.templateSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteTemplate() {
      if (typeof this.templateSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.templateDataService.delete(this.templateSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getTemplates();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.templateDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain;charset=utf-8' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Templates.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.templateDataService.get().then( r => {
         const backupData = r as Template[];
         let output = 'id;variables;body\n';
         backupData.forEach(element => {
            output += element.id + ';' + element.variables + ';' + element.body + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Templates.csv');
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
            this.templateDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true , size: 'lg' }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.templateSelected.id === 'undefined') {
               this.templateDataService.post(this.templateSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getTemplates();
               }).catch( e => console.log(e) );
            } else {
               this.templateDataService.put(this.templateSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getTemplates();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}