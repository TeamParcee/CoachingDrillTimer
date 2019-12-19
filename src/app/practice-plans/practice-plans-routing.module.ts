import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PracticePlansPage } from './practice-plans.page';

const routes: Routes = [
  {
    path: '',
    component: PracticePlansPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PracticePlansPageRoutingModule {}
