import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MyTemplatesPageComponent } from './my-templates-page.component';

const routes: Routes = [
  {
    path: '',
    component: MyTemplatesPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyTemplatesPageRoutingModule {}
