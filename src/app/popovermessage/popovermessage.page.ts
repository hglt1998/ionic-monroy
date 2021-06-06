import { Component, OnInit, Input } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popovermessage',
  templateUrl: './popovermessage.page.html',
  styleUrls: ['./popovermessage.page.scss'],
})
export class PopovermessagePage implements OnInit {


  @Input() texto: string = "Si sale este texto, no hay mensaje";

  constructor(private popover: PopoverController,
    public navParams: NavParams) { }

  ngOnInit() {
    //Se recupera el texto de los parametros de navegacion/creación del componente
    this.texto = this.navParams.get('texto');
  }


  ClosePopoverMessage() {
    this.popover.dismiss();
  }
}
