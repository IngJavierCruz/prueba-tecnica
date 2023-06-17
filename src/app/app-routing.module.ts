import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '@guards//authentication.guard';
import { PermissionAdminGuard } from '@guards//permisssion-admin.guard';
import { PermissionClientGuard } from '@guards//permisssion-client.guard';
import { SessionGuard } from '@guards//session.guard';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [SessionGuard],
    loadChildren: () => import('./authentication/authentication.module').then((m) => m.AuthenticationModule)
  },
  {
    path: 'app',
    canActivate: [AuthenticationGuard, PermissionClientGuard],
    loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule)
  },
  {
    path: 'admin',
    canActivate: [AuthenticationGuard, PermissionAdminGuard],
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule)
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // useHash: true,
    // scrollPositionRestoration: 'enabled',
    // onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }