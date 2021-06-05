import { FormControl, FormGroup, Validators } from "@angular/forms";

export class Patient {
   id: number;
   age: number;
   patient_form: FormGroup;

   constructor() {
      this.patient_form = this.createForm();
      this.age = -1;
      this.id = 0;
   }

   get identification() {
      return this.patient_form.get('identification');
   }

   get fullname() {
      return this.patient_form.get('fullname');
   }

   get born_date() {
      return this.patient_form.get('born_date');
   }

   get gender() {
      return this.patient_form.get('gender');
   }

   get email() {
      return this.patient_form.get('email');
   }

   get contact_number() {
      return this.patient_form.get('contact_number');
   }

   get address() {
      return this.patient_form.get('address');
   }

   createForm(): FormGroup {
      let emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let phonePattern = /^\d+$/;
      return new FormGroup( {
         identification: new FormControl('', [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(13),
         ]),
         fullname: new FormControl('', [
            Validators.required,
            Validators.minLength(5)
         ]),
         born_date: new FormControl('', Validators.required),
         gender: new FormControl('', Validators.required),
         email: new FormControl('', [
            Validators.required,
            Validators.minLength(5),
            Validators.pattern(emailPattern)
         ]),
         contact_number: new FormControl('', [
            Validators.required,
            Validators.minLength(7),
            Validators.maxLength(10),
            Validators.pattern(phonePattern)
         ]),
         address: new FormControl('', [
            Validators.required,
            Validators.minLength(5)
         ])
      });
   }

   calc_age() {
      let born_date = new Date(this.born_date.value).getTime();
      let now = new Date().getTime();
      let age = (now - born_date) / (365*24*60*60*1000);
      this.age = Math.floor(age);
   }
   
}