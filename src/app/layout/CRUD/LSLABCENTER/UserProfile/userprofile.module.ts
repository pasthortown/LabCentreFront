import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileRoutingModule } from './userprofile-routing.module';
import { UserProfileComponent } from './userprofile.component';
import { UserProfileService } from 'src/app/services/CRUD/LSLABCENTER/userprofile.service';
import { environment } from 'src/environments/environment';
import { ProfileService } from 'src/app/services/CRUD/LSLABCENTER/profile.service';
import { UserService } from 'src/app/services/profile/user.service';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
   imports: [CommonModule,
             UserProfileRoutingModule,
             NgxSpinnerModule,
             FormsModule],
   declarations: [UserProfileComponent],
   providers: [
               NgbModal,
               ProfileService,
               UserService,
               UserProfileService
               ]
})
export class UserProfileModule {}