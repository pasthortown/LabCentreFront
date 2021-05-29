import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MyLaboratoryPageComponent } from './my-laboratory-page.component';

const routes: Routes = [
  {
    path: '',
    component: MyLaboratoryPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyLaboratoryPageRoutingModule {}
