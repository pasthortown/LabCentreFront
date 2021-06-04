import { Component, OnInit, Input } from '@angular/core';
import { Patient } from 'src/app/models/LSLABCENTER/Patient';
import { Sample } from 'src/app/models/LSLABCENTER/Sample';
import { Template } from 'src/app/models/LSLABCENTER/Template';
import { TemplateService } from 'src/app/services/CRUD/LSLABCENTER/template.service';
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

  constructor( private templateDataService: TemplateService) { 
    this.sample_types = environment.tipo_muestras;
  }

  ngOnInit(): void {
    
  }

  getTemplates(sample_description: String, laboratory_id: number) {
    this.templateDataService.get_by_sample_description(sample_description, laboratory_id).then( r => {
      this.templates = r as Template[];
    }).catch(e => { console.log(e); });
  }

  ngOnChanges() {
    this.sample.laboratory_id = this.laboratory_id;
    this.sample.patient_id = this.patient.id;
    this.sample.status = 'En Proceso';
  }

  selectTemplate(template_id: number) {
    this.templates.forEach(element => {
      if (element.id == template_id) {
        this.selectedTemplate = element;    
      }
    });
  }
}
