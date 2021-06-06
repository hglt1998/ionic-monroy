import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { firestore } from 'firebase';
import { Guardia } from '../model/Guardia.model';
import { Horario } from '../model/Horario.model';


@Injectable({
    providedIn: 'root'
})
export class GuardiasService {

    private dbPath = '/guardias';

    guardiasRef: AngularFireList<Guardia> = null;
    horarioGuardiasRef: AngularFireList<Horario> = null;

    constructor(private db: AngularFireDatabase
    ) {

        this.guardiasRef = db.list(this.dbPath);
    }


    //Este método recuperará los horarios de los profes que faltan
    getHorarioGuardiaByUsuario(usuario: string): AngularFireList<Horario> {
        this.horarioGuardiasRef = this.db.list('/horario', ref => ref.orderByChild('profesor').equalTo(usuario));
        return this.horarioGuardiasRef;
    }

    getAll(): AngularFireList<Guardia> {
        return this.guardiasRef;
    }

    getGuardiasDelDia(): AngularFireList<Guardia> {
        //Creamos la date de hoy y la iniciamos a las 0:00:00
        let date: Date = new Date();  
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        var startDate = firestore.Timestamp.fromDate(date).seconds;
        console.log("Fecha inicio->"+startDate);
        //Ponemos la fecha a las 23:59
        date.setHours(23);
        date.setMinutes(59);
        var endDate = firestore.Timestamp.fromDate(date).seconds;
        console.log("Fecha fin->"+endDate);
        //Estos serán los limites sobre los que buscar las guardias de hoy

        this.guardiasRef = this.db.list('/guardias', ref => ref.orderByChild('Fecha').startAt(startDate).endAt(endDate));
        return this.guardiasRef;
    }

    create(guardia: Guardia): any {
        return this.guardiasRef.push(guardia);
    }

    update(key: string, value: any): Promise<void> {
        return this.guardiasRef.update(key, value);
    }

    delete(key: string): Promise<void> {
        return this.guardiasRef.remove(key);
    }

    deleteAll(): Promise<void> {
        return this.guardiasRef.remove();
    }
}