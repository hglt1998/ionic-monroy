import { Component, OnInit } from '@angular/core';
import {PopoverController} from '@ionic/angular';
import { AuthenticationService } from "../authentication.service";
import { AngularFireAuthModule } from '@angular/fire/auth';
import { auth } from 'firebase';
import { hasUncaughtExceptionCaptureCallback } from 'process';

@Component({
  selector: 'app-popoverlogout',
  templateUrl: './popoverlogout.page.html',
  styleUrls: ['./popoverlogout.page.scss'],
})
export class PopoverlogoutPage implements OnInit {

  constructor(private popover:PopoverController, private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }
  ClosePopover() {
    this.popover.dismiss();
  }

  logOut() {
    this.authenticationService.SignOut();
    this.popover.dismiss();
  }
}
