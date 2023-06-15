import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { TestRoutingModule } from './test-routing.module';
// COMPONENTS
import { TabViewImplementationComponent } from './components/tab-view-implementation/tab-view-implementation.component';
import { TestComponent } from './test.component';
import { ListComponent } from './components/list/list.component';


const MODULES = [
  TestRoutingModule,
  SharedModule,
];

const COMPONENTS: any[] = [
  TabViewImplementationComponent,
  TestComponent,
  ListComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
})
export class TestModule { }
