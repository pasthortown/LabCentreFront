
export class ResultAttachment {
   id: number;
   sample_id: number;
   result_attachment_file_type: String;
   result_attachment_file_name: String;
   result_attachment_file: String;
   constructor() {
      this.result_attachment_file_type = '';
      this.result_attachment_file_name = '';
      this.result_attachment_file = '';
   }
}