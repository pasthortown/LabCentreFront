import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit, Input } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';

import { TemplateService } from 'src/app/services/CRUD/LSLABCENTER/template.service';

import { Template } from 'src/app/models/LSLABCENTER/Template';
import { Laboratory } from 'src/app/models/LSLABCENTER/Laboratory';

@Component({
  selector: 'app-templates-of-laboratory',
  templateUrl: './templates-of-laboratory.component.html',
  styleUrls: ['./templates-of-laboratory.component.css']
})
export class TemplatesOfLaboratoryComponent implements OnInit {
  
    @Input('laboratory') laboratory: Laboratory = new Laboratory();
    templates: Template[] = [];
    templateSelected: Template = new Template();

    currentPage = 1;
    lastPage = 1;
    showDialog = false;
    recordsByPage = 5;
    sample_types: any[] = [];
  
    constructor(private modalService: NgbModal,
      private toastr: ToastrManager,
      private spinner: NgxSpinnerService,
      private templateDataService: TemplateService) { 
         this.sample_types = environment.tipo_muestras;
      }

    ngOnInit() {
    }

    ngOnChanges() {
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
      this.spinner.show();
      this.templates = [];
      this.templateSelected = new Template();
      this.templateDataService.get_paginate(this.recordsByPage, this.currentPage, this.laboratory.id).then( r => {
         this.templates = r.data as Template[];
         this.lastPage = r.last_page;
         this.spinner.hide();
      }).catch( e => console.log(e) );
    }

    newTemplate(content) {
      this.templateSelected = new Template();
      this.templateSelected.laboratory_id = this.laboratory.id;
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
         let output = 'id;variables;body;orientation;title\n';
         backupData.forEach(element => {
            output += element.id + ';' + element.body + ';' + element.orientation + ';' + element.title + '\n';
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

    downloadFile(template: Template) {
      this.descargarPDF(template.body, template.title, template.orientation);
    }

    descargarPDF(html: String, title: String, orientation: String) {
      const params = {
         ciudad: 'Quito',
         fecha: new Date().toLocaleString(),
         laboratory_id: this.laboratory.id,
         codigo: '1',
         nombre_comercial: 'LSYSTEMS',
         propietario: 'Luis Alfonso Salazar Vaca',
         representante_legal: 'Luis Alfonso Salazar Vaca',
         direccion_establecimiento: 'Los Robles E14-16 y Cardos',
         Registro: '1'};
      this.templateDataService.download(html, title, orientation, true, this.buildQRData(params), params).then( r => {
         const byteCharacters = atob(r);
         const byteNumbers = new Array(byteCharacters.length);
         for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
         }
         const byteArray = new Uint8Array(byteNumbers);
         const blob = new Blob([byteArray], { type: 'application/pdf'});
         saveAs(blob, title + '.pdf');
      }).catch( e => { console.log(e); });
   }

   buildQRData(params: any): string {
      return JSON.stringify(params);
   }

}
