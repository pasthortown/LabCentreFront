import { ProfilePicture } from './ProfilePicture';

export class User {
   id: number;
   name: String;
   email: String;
   password: String;
   api_token: String;
   profile_picture: ProfilePicture;

   constructor() {
      this.id = 0;
      this.name = '';
      this.email = '';
      this.password = '';
      this.api_token = '';
      this.profile_picture = new ProfilePicture();
   }
}
