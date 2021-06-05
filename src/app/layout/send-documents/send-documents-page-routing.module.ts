import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SendDocumentsPageComponent } from './send-documents-page.component';

const routes: Routes = [
  {
    path: '',
    component: SendDocumentsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SendDocumentsPageRoutingModule {}
