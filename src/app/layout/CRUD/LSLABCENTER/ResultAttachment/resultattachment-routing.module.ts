import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultAttachmentComponent } from './resultattachment.component';

const routes: Routes = [
   {
      path: '',
      component: ResultAttachmentComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class ResultAttachmentRoutingModule {}
