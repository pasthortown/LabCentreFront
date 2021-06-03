
export class Sample {
   id: number;
   patient_id: number;
   description: String;
   acquisition_date: Date;
   status: String;
   laboratory_id: number;
   constructor() {
      this.description = '';
      this.acquisition_date = new Date();
      this.status = '';
   }
}