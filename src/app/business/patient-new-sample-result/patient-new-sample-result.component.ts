import { Component, OnInit, Input } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Patient } from 'src/app/models/LSLABCENTER/Patient';
import { Sample } from 'src/app/models/LSLABCENTER/Sample';
import { Template } from 'src/app/models/LSLABCENTER/Template';
import { TemplateService } from 'src/app/services/CRUD/LSLABCENTER/template.service';
import { SampleService } from 'src/app/services/CRUD/LSLABCENTER/sample.service';
import { SampleParam } from 'src/app/models/LSLABCENTER/SampleParam';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-patient-new-sample-result',
  templateUrl: './patient-new-sample-result.component.html',
  styleUrls: ['./patient-new-sample-result.component.css']
})
export class PatientNewSampleResultComponent implements OnInit {
  @Input('patient') patient: Patient = new Patient();
  @Input('laboratory_id') laboratory_id: number = 0;
  sample: Sample = new Sample();
  sample_types: any[] = [];

  templates: Template[] = [];
  selectedTemplate: Template = new Template();
  selected_template_id = 0;

  constructor( private toastr: ToastrManager,
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
    this.templateDataService.get_by_sample_description(sample_description, laboratory_id).then( r => {
      this.templates = r as Template[];
    }).catch(e => { console.log(e); });
  }

  ngOnChanges() {
    this.sample.laboratory_id = this.laboratory_id;
    this.sample.patient_id = this.patient.id;
    this.sample.status = 'En Proceso';
  }

  selectTemplate() {
    this.selectedTemplate = new Template();
    this.templates.forEach(element => {
      if (element.id == this.selected_template_id) {
        this.selectedTemplate = element;  
        this.sample.sample_param = this.analizar_plantilla(element.body);  
      }
    });
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

  save_sample() {
    if (typeof this.sample.id === 'undefined') {
      this.sampleDataService.post(this.sample).then( r => {
        this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
      }).catch( e => console.log(e) );
    } else {
      this.sampleDataService.put(this.sample).then( r => {
        this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
      }).catch( e => console.log(e) );
    }
  }
}
