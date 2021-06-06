import { Component, OnInit } from '@angular/core';
import Horario from './schedule.model';
import { HorarioService } from './schedule.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {

  horario: Horario = new Horario();
  horarioRef: any;
  name: String;

  today: number = Date.now();

  constructor(private horarioService: HorarioService) { }

  ngOnInit() {
    this.horarioService.getHorarioDelDia().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.horarioRef = data.filter(object => {
        return object['dia'] == (new Date().getDay());
      }).sort((a, b) => a.hora - b.hora)
    });
    console.log("HORARIOREF: " + this.horarioRef);
    
    this.horarioService.getAllData();

    
  }

  url = 'https://monroypasen-default-rtdb.europe-west1.firebasedatabase.app/horario.json?orderBy=%22Profesor%22&equalTo=%22Melecio%22';
  get(url){
    var name = new XMLHttpRequest();
    name.open("GET", url, false);
    name.send(null);
    let nombrePrueba = name.responseText;
    return nombrePrueba;
  }
  

  ngAfterContentInit(url) {
    this.name = this.get(url);
  }
  
}
