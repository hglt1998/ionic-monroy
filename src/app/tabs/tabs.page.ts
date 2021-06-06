import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

import { PopoverlogoutPage } from '../popoverlogout/popoverlogout.page';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(private popover: PopoverController) { }

  ngOnInit() {
  }


  CreatePopover() {
    this.popover.create({
      component: PopoverlogoutPage,
      showBackdrop: false
    }).then((popoverElement) => {
      popoverElement.present();
    })
  }

  returnButton() {
    window.history.back();
  }
}
