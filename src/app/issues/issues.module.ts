import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { IssuesPageRoutingModule } from './issues-routing.module';

import { IssuesPage } from './issues.page';
import { EmailComposer } from '@ionic-native/email-composer';
import { IonicNativePlugin } from '@ionic-native/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IssuesPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [IssuesPage],
  providers: [
    { provide: EmailComposer, useClass: IonicNativePlugin }
  ]
})
export class IssuesPageModule {}
