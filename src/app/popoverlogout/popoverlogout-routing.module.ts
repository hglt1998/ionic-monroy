import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopoverlogoutPage } from './popoverlogout.page';

const routes: Routes = [
  {
    path: '',
    component: PopoverlogoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopoverlogoutPageRoutingModule {}
