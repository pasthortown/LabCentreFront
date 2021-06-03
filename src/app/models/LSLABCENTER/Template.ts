
export class Template {
   id: number;
   body: String;
   orientation: String;
   title: String;
   laboratory_id: number;
   constructor() {
      this.body = '';
      this.orientation = '';
      this.title = '';
      this.laboratory_id = 0;
   }
}