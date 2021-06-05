import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthAdminGuard } from '../components/guard/auth-admin.guard';
import { AuthLabAdminGuard } from '../components/guard/auth-lab-admin.guard';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
   {
      path: '',
      component: LayoutComponent,
      children: [
         {
            path: '',
            redirectTo: 'main'
         },
         {
            path: 'send-documents',
            loadChildren: './send-documents/send-documents-page.module#SendDocumentsPageModule',
            canActivate: [AuthLabAdminGuard, AuthAdminGuard]
         },
         {
            path: 'in-course',
            loadChildren: './in-course/in-course-page.module#InCoursePageModule'
         },
         {
            path: 'main',
            loadChildren: './main/main.module#MainModule'
         },
         {
            path: 'profile',
            loadChildren: './profile/profile.module#ProfileModule'
         },

         //LSLabCenter

         {
            path: 'patient',
            loadChildren: './CRUD/LSLABCENTER/Patient/patient.module#PatientModule',
            canActivate: [AuthAdminGuard]
         },
         {
            path: 'laboratory',
            loadChildren: './CRUD/LSLABCENTER/Laboratory/laboratory.module#LaboratoryModule',
            canActivate: [AuthAdminGuard]
         },
         {
            path: 'laboratory_attachment',
            loadChildren: './CRUD/LSLABCENTER/LaboratoryAttachment/laboratoryattachment.module#LaboratoryAttachmentModule',
            canActivate: [AuthAdminGuard]
         },
         {
            path: 'laboratory_auth_user',
            loadChildren: './CRUD/LSLABCENTER/LaboratoryAuthUser/laboratoryauthuser.module#LaboratoryAuthUserModule',
            canActivate: [AuthAdminGuard]
         },
         {
            path: 'user_profile',
            loadChildren: './CRUD/LSLABCENTER/UserProfile/userprofile.module#UserProfileModule',
            canActivate: [AuthAdminGuard]
         },
         {
            path: 'account-profile',
            loadChildren: './CRUD/LSLABCENTER/Profile/profile.module#ProfileModule',
            canActivate: [AuthAdminGuard]
         },
         {
            path: 'template',
            loadChildren: './CRUD/LSLABCENTER/Template/template.module#TemplateModule',
            canActivate: [AuthAdminGuard]
         },
         {
            path: 'my-laboratory',
            loadChildren: './my-laboratory/my-laboratory-page.module#MyLaboratoryPageModule',
            canActivate: [AuthLabAdminGuard]
         },
         {
            path: 'my-templates',
            loadChildren: './my-templates/my-templates-page.module#MyTemplatesPageModule',
            canActivate: [AuthLabAdminGuard]
         },
         {
            path: 'blank',
            loadChildren: './blank-page/blank-page.module#BlankPageModule'
         },
         {
            path: 'not-found',
            loadChildren: './not-found/not-found.module#NotFoundModule'
         },
         {
            path: '**',
            redirectTo: 'not-found'
         }
      ]
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule],
   providers: [AuthAdminGuard, AuthLabAdminGuard]
})
export class LayoutRoutingModule {}