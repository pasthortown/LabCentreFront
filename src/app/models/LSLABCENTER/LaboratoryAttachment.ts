
export class LaboratoryAttachment {
   id: number;
   laboratory_attachment_description: String;
   laboratory_id: number;
   laboratory_attachment_file_type: String;
   laboratory_attachment_file_name: String;
   laboratory_attachment_file: String;
   constructor() {
      this.laboratory_attachment_description = '';
      this.laboratory_attachment_file_type = '';
      this.laboratory_attachment_file_name = '';
      this.laboratory_attachment_file = '';
   }
}