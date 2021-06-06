import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopovermessagePageRoutingModule } from './popovermessage-routing.module';

import { PopovermessagePage } from './popovermessage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopovermessagePageRoutingModule
  ],
  declarations: [PopovermessagePage]
})
export class PopovermessagePageModule {}
