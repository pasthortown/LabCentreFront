import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InCoursePageComponent } from './in-course-page.component';

const routes: Routes = [
  {
    path: '',
    component: InCoursePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InCoursePageRoutingModule {}
