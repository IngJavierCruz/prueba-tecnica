import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './test.component';
import { TabViewImplementationComponent } from './components/tab-view-implementation/tab-view-implementation.component';

const routes: Routes = [
  {
    path: '',
    component: TestComponent,
    children: [
      {
        path: 'tab',
        component: TabViewImplementationComponent,
      },
      {
        path: '',
        redirectTo: 'tab',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'tab'
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
