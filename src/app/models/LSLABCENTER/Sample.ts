import { SampleParam } from './SampleParam';

export class Sample {
   id: number;
   patient_id: number;
   description: String;
   acquisition_date: Date;
   status: String;
   laboratory_id: number;
   analysys_title: String;
   sample_param: SampleParam[];
   constructor() {
      this.analysys_title = '';
      this.description = '';
      this.acquisition_date = new Date();
      this.status = '';
      this.sample_param = [];
   }
}