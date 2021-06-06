import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AuthenticationService } from "../authentication.service";
import Horario from './schedule.model';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  private dbPath = '/horario';

  horarioRef: AngularFireList<Horario> = null;

  constructor(private db: AngularFireDatabase) {

    this.horarioRef = db.list(this.dbPath);
  }

  /* Este metodo recupera el horario del usuario en el dia correspondiente  */
  getHorarioDelDia(): AngularFireList<Horario> {
    this.horarioRef = this.db.list('/horario', ref =>
      ref.orderByChild('profesor').equalTo(AuthenticationService.profesor.UsuarioHorario));
    return this.horarioRef;
  }

  getAllData() {
    this.db.list('/profesores').valueChanges().subscribe((datas) => {
      console.log("datas ", datas)
    }, (err) => {
      console.log("Error", err)
    });
  }

  getAll(): AngularFireList<Horario> {
    return this.horarioRef;
  }



  create(tutorial: Horario): any {
    return this.horarioRef.push(tutorial);
  }

  update(key: string, value: any): Promise<void> {
    return this.horarioRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.horarioRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.horarioRef.remove();
  }
}