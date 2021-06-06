import { AfterContentInit, Component, OnInit } from '@angular/core';
import { firestore } from 'firebase';
import { LoginService } from '../login/login.service';
import { Guardia } from '../model/Guardia.model';
import { GuardiasService } from './guardias.service';
import { Profesor } from '../model/Profesor.model';
import { map } from 'rxjs/operators';
import { Horario } from '../model/Horario.model';
import { PopoverController } from '@ionic/angular';
import { PopovermessagePage } from '../popovermessage/popovermessage.page';

@Component({
  selector: 'app-guardias',
  templateUrl: './guardias.page.html',
  styleUrls: ['./guardias.page.scss'],
})
export class GuardiasPage implements AfterContentInit, OnInit {

  g: Guardia = new Guardia();
  guardias: any;
  listaGuardias: Horario[] = [];

  //Variables para campos de una nueva guardia
  profesores: any;
  profesorSeleccionado: Profesor = new Profesor();
  fechaGuardia: string = new Date().toISOString();
  minDate: string = new Date().toISOString();


  constructor(public guardiaService: GuardiasService,
    public profesoresService: LoginService,
    private popover: PopoverController) { }


  //Para recuperar la lista de guardias.
  ngOnInit() {
    //Iniciamos la carga del horario del usuario
    this.guardiaService.getGuardiasDelDia().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.guardias = data.filter(object => {
        this.guardiaService.getHorarioGuardiaByUsuario(object.UsuarioHorario).valueChanges().subscribe(
          value => {
            value.map(
              h => {
                var diaSemana = new Date().getDay(); //TODO, coger solo la hora
                if (diaSemana == h.dia) {
                  h.nombreProfesor = object.Nombre;
                  h.key = object.key;
                  this.listaGuardias.push(h);
                }
              })
          }
        )

        return object;
      }).sort((a, b) => a.Fecha - b.Fecha)
    });
  }


  //Para la carga de profesores del combo
  ngAfterContentInit() {
    this.profesoresService.getAll().snapshotChanges().pipe(
      map(changes =>
        (changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        ))
      )
    ).subscribe(data => {
      this.profesores = data.filter(object => {
        return object['Empleado'];
      }).sort((a, b) => a.Empleado.localeCompare(b.Empleado))
    }
    );
  }


  crearGuardia() {

    //Comprobamos que se ha seleccionado un profesor
    if (this.profesorSeleccionado.Email == null) {
      //Mostramos mensaje de error
      this.crearPopOverMessage("Debe seleccionar un profesor/a"); //FIXME a un properties con los texto/mensajes

    } else { //TODA LA PESCA

      //Creamos una fecha a hora 0:00:00
      let date: Date = new Date();
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);

      this.g.Fecha = firestore.Timestamp.fromDate(date).seconds;
      this.g.UsuarioHorario = this.profesorSeleccionado.UsuarioHorario;
      this.g.Nombre = this.profesorSeleccionado.Empleado;

      //Comprobamos si ya existe. No es muy elegante, crear un comparator? FIXME ?
      let existe: boolean = false;
      this.listaGuardias.forEach(h => {
        if (h.profesor == this.g.UsuarioHorario) {
          existe = true;
          this.crearPopOverMessage("La ausencia ya estaba registrada");
        }
      });

      if (!existe) { //Si no esta en listaGuardias, se añade y se limpia la lista.
        this.listaGuardias = [];
        this.guardiaService.create(this.g); //Añadimos la guardia a la base de datos
      }
    }
  }

  crearPopOverMessage(mensaje: string) {
    this.popover.create({
      component: PopovermessagePage,
      componentProps: { texto: mensaje },
      showBackdrop: false
    }).then((popoverElement) => {
      popoverElement.present();
    })
  }

  //Metodo para eliminar una guardia
  eliminarGuardia(id: string) {
       
    //Lo eliminamos en la BBDD
    this.guardiaService.delete(id);
    //Recargamos
    this.listaGuardias = [];

  }

}
