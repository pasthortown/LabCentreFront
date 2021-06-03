
export class Laboratory {
   id: number;
   ruc: String;
   responsable_name: String;
   main_contact_number: String;
   secondary_contact_number: String;
   description: String;
   address: String;
   geolocation: any;
   constructor() {
      this.ruc = '';
      this.responsable_name = '';
      this.main_contact_number = '';
      this.secondary_contact_number = '';
      this.description = '';
      this.address = '';
      this.geolocation = { type: "Point", coordinates: [ 0, 0 ] };
   }
}