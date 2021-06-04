import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrManager } from 'ng6-toastr-notifications';
import { PatientService } from 'src/app/services/CRUD/LSLABCENTER/patient.service';
import { Patient } from 'src/app/models/LSLABCENTER/Patient';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    search_criteria: String = '';
    patients: any[] = [];
    patientSelected: Patient = new Patient();
    show_search_results = false;
    laboratory_id = 1;
    
    constructor(
        private spinner: NgxSpinnerService,
        private modalService: NgbModal,
        private toastr: ToastrManager,
        private patientDataService: PatientService) {}

    ngOnInit() {}

    wait_for_search(event) {
        this.show_search_results = false;
        this.patientSelected = new Patient();
        if (event.key == 'Enter' && this.search_criteria.length >= 3) {
            this.search_patient();
        }
    }

    search_patient() {
        this.patients = [];
        this.patientSelected = new Patient();
        this.show_search_results = false;
        this.patientDataService.search(this.search_criteria).then( r => {
            this.patients = r as any[];
            this.show_search_results = true;
        }).catch( e => { console.log(e); });
    }

    new_patient(patient_modal) {
        this.patientSelected = new Patient();
        this.openPatientDialog(patient_modal);
    }

    edit_patient(patient, patient_modal) {
        this.selectPatient(patient);
        if (typeof this.patientSelected.id === 'undefined' || this.patientSelected.id == 0) {
           this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
           return;
        }
        this.openPatientDialog(patient_modal);
    }

    save_data(): void {
        if (typeof this.patientSelected.id === 'undefined' || this.patientSelected.id == 0) {
           this.patientDataService.post(this.patientSelected.patient_form.value).then( r => {
              this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
              this.search_criteria = this.patientSelected.patient_form.value.identification;
              this.search_patient();
           }).catch( e => console.log(e) );
        } else {
           let patient_data = this.patientSelected.patient_form.value;
           patient_data.id = this.patientSelected.id;
           this.patientDataService.put(patient_data).then( r => {
              this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
              this.search_criteria = this.patientSelected.patient_form.value.identification;
              this.search_patient();
           }).catch( e => console.log(e) );
        }
    }

    openPatientDialog(patient_modal) {
        this.modalService.open(patient_modal, { centered: true }).result.then(( response => {
           if ( response === 'Guardar click' ) {
              this.save_data();
           }
        }), ( r => {}));
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
        this.patientSelected.calc_age();
    }
}
