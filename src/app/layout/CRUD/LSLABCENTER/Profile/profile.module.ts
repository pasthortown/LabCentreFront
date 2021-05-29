import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ProfileService } from 'src/app/services/CRUD/LSLABCENTER/profile.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
   imports: [CommonModule,
             NgxSpinnerModule,
             ProfileRoutingModule,
             FormsModule],
   declarations: [ProfileComponent],
   providers: [
               NgbModal,
               ProfileService
               ]
})
export class ProfileModule {}