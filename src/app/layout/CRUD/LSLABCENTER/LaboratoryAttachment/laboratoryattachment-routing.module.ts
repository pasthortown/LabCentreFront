import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaboratoryAttachmentComponent } from './laboratoryattachment.component';

const routes: Routes = [
   {
      path: '',
      component: LaboratoryAttachmentComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class LaboratoryAttachmentRoutingModule {}
