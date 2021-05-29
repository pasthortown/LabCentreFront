import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TemplateRoutingModule } from './template-routing.module';
import { TemplateComponent } from './template.component';
import { TemplateService } from 'src/app/services/CRUD/LSLABCENTER/template.service';
import { environment } from 'src/environments/environment';
import { CKEditorModule } from 'ngx-ckeditor';

@NgModule({
   imports: [CommonModule,
             TemplateRoutingModule,
             CKEditorModule,
             FormsModule],
   declarations: [TemplateComponent],
   providers: [
               NgbModal,
               TemplateService
               ]
})
export class TemplateModule {}