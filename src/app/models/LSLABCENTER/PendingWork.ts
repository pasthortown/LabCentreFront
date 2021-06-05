import { Patient } from './Patient';
import { Sample } from './Sample';

export class PendingWork {
   sample: any;
   patient: any;
   
   constructor() {
      this.sample = new Sample();
      this.patient = new Patient();
   }
}