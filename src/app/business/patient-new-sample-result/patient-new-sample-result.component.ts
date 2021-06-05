import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Patient } from 'src/app/models/LSLABCENTER/Patient';
import { Sample } from 'src/app/models/LSLABCENTER/Sample';
import { Template } from 'src/app/models/LSLABCENTER/Template';
import { ResultAttachment } from 'src/app/models/LSLABCENTER/ResultAttachment';
import { TemplateService } from 'src/app/services/CRUD/LSLABCENTER/template.service';
import { SampleService } from 'src/app/services/CRUD/LSLABCENTER/sample.service';
import { NgxSpinnerService } from "ngx-spinner";
import { SampleParam } from 'src/app/models/LSLABCENTER/SampleParam';
import { environment } from 'src/environments/environment';
import { saveAs } from 'file-saver/FileSaver';

@Component({
  selector: 'app-patient-new-sample-result',
  templateUrl: './patient-new-sample-result.component.html',
  styleUrls: ['./patient-new-sample-result.component.css']
})
export class PatientNewSampleResultComponent implements OnInit {
  @Input('is_new') is_new: Boolean = true;
  @Input('patient') patient: any = null;
  @Input('laboratory_id') laboratory_id: number = 0;
  @Input('sample') sample: Sample = new Sample();
  @Output('sample_taked') sample_taked: EventEmitter<any> = new EventEmitter<any>();

  sample_types: any[] = [];

  templates: Template[] = [];
  selectedTemplate: Template = new Template();
  selected_template_id = 0;
  resultAttachment: ResultAttachment = new ResultAttachment();

  constructor( private toastr: ToastrManager,
            private spinner: NgxSpinnerService,
            private templateDataService: TemplateService, 
            private sampleDataService: SampleService) { 
    this.sample_types = environment.tipo_muestras;
  }

  ngOnInit(): void {
  }

  getTemplates(sample_description: String, laboratory_id: number) {
    this.selectedTemplate = new Template();
    this.templates = [];
    this.selected_template_id = 0;
    this.spinner.show();
    this.templateDataService.get_by_sample_description(sample_description, laboratory_id).then( r => {
      this.spinner.hide();
      this.templates = r as Template[];
    }).catch(e => { console.log(e); });
  }

  ngOnChanges() {
    if (this.is_new) {
      this.sample.laboratory_id = this.laboratory_id;
      this.sample.patient_id = this.patient.id;
      this.sample.status = 'En Proceso';  
    }
  }

  selectTemplate() {
    if (this.is_new) {
      this.selectedTemplate = new Template();
      this.templates.forEach(element => {
        if (element.id == this.selected_template_id) {
          this.selectedTemplate = element;  
          this.sample.sample_param = this.analizar_plantilla(element.body);  
          this.sample.analysys_title = element.title;
        }
      });
    }
  }

  analizar_plantilla(template_body: String): SampleParam[] {
    let body_text = template_body.split('</tr>');
    let rows = [];

    body_text.forEach(element => {
      let row = element.split('<tr')[1];
      if (typeof row != 'undefined') {
        if (row.includes('##sample_value')) {
          rows.push(row);
        }
      }
    });

    let sample_params: SampleParam[] = [];

    rows.forEach(row => {
      let sample_param = new SampleParam();
      sample_param.description = row.split('id="description')[1].split('">')[1].split('</t')[0];
      if (row.includes('##sample_value_double##')) {
        sample_param.type = 'double';
      } else {
        sample_param.type = 'text';
      }
      if (row.includes('id="units"')) {
        sample_param.units = row.split('id="units')[1].split('">')[1].split('</t')[0];
      }
      if (row.includes('id="notes"')) {
        sample_param.notes = row.split('id="notes')[1].split('">')[1].split('</t')[0];
      }
      sample_params.push(sample_param);
    });

    return sample_params;
  }

  save_sample(status: String) {
    this.sample.status = status;
    if (typeof this.sample.id === 'undefined') {
      this.spinner.show();
      this.sampleDataService.post(this.sample).then( r => {
        this.sample.id = r.id;
        if (status == 'Impreso') {
          this.imprimir('Datos guardados satisfactoriamente.', 'Nuevo');
        } else {
          this.finish_save('Datos guardados satisfactoriamente.', 'Nuevo');
        }
      }).catch( e => console.log(e) );
    } else {
      this.spinner.show();
      this.sampleDataService.put(this.sample).then( r => {
        if (status == 'Impreso') {
          this.imprimir('Registro actualizado satisfactoriamente.', 'Actualizar');
        } else {
          this.finish_save('Registro actualizado satisfactoriamente.', 'Actualizar');
        }
      }).catch( e => console.log(e) );
    }
  }

  finish_save(message: string, title_message: string) {
    this.spinner.hide();
    this.toastr.successToastr(message, title_message);
    this.sample_taked.emit(true);
  }

  imprimir(message: string, title_message: string) {   
    let doc_name = this.patient.identification + '_' + this.sample.analysys_title + '.pdf';
    doc_name = doc_name.replace(' ','_');
    let born_date = new Date(this.patient.born_date).getTime();
    let now = new Date().getTime();
    let age = (now - born_date) / (365*24*60*60*1000);
    this.patient.age = Math.floor(age);
    let params = {
      doc_name: doc_name,
      patient: this.patient,
      sample: this.sample,
      laboratory_id: this.laboratory_id
    };
    this.templateDataService.print_sample_result(
      true, 
      params).then( r => {
        const byteCharacters = atob(r);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf'});
        saveAs(blob, doc_name);
        this.finish_save(message,title_message);
    }).catch( e => { console.log(e); });
  }

}
