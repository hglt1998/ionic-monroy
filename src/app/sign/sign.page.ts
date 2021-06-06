import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular'

@Component({
  selector: 'app-sign',
  templateUrl: './sign.page.html',
  styleUrls: ['./sign.page.scss'],
})
export class SignPage implements OnInit {

  constructor(public toastController: ToastController){

  }
  ngOnInit() {

  }

  async presentToast() {
    const toast = await this.toastController.create({
      header: 'Firmado con éxito',
      message:'Ha firmado correctamente en el registro del centro',
      position:'middle',
      color: "secondary",
      buttons: [
        {
          side: 'start',
          text: 'Cerrar',
        }
      ]
    });
    await toast.present();
  }



}
