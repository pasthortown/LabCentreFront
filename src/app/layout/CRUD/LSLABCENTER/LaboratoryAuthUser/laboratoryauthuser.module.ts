import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LaboratoryAuthUserRoutingModule } from './laboratoryauthuser-routing.module';
import { LaboratoryAuthUserComponent } from './laboratoryauthuser.component';
import { LaboratoryAuthUserService } from 'src/app/services/CRUD/LSLABCENTER/laboratoryauthuser.service';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/profile/user.service';
import { LaboratoryService } from 'src/app/services/CRUD/LSLABCENTER/laboratory.service';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
   imports: [CommonModule,
             NgxSpinnerModule,
             LaboratoryAuthUserRoutingModule,
             FormsModule],
   declarations: [LaboratoryAuthUserComponent],
   providers: [
               NgbModal,
               LaboratoryAuthUserService,
               UserService,
               LaboratoryService
               ]
})
export class LaboratoryAuthUserModule {}