import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopoverlogoutPageRoutingModule } from './popoverlogout-routing.module';

import { PopoverlogoutPage } from './popoverlogout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopoverlogoutPageRoutingModule
  ],
  declarations: [PopoverlogoutPage]
})
export class PopoverlogoutPageModule {}
