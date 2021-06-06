import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AuthenticationService } from "../authentication.service";
import { Profesor } from '../model/Profesor.model';
import Horario from '../schedule/schedule.model';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    private dbPath = '/horario';

    horarioRef: AngularFireList<Horario> = null;
    name: AngularFireList<String> = null;
    email: AngularFireList<String> = null;
    profesor: AngularFireList<Profesor> = null;

    constructor(private db: AngularFireDatabase) {

        this.email = db.list(this.dbPath);
        this.name = db.list(this.dbPath);
        this.horarioRef = db.list(this.dbPath);
        this.profesor = db.list(this.dbPath);
    }

    /* Este metodo recupera el horario del usuario en el dia correspondiente  */
    getHorarioDelDia(): AngularFireList<Horario> {
        this.horarioRef = this.db.list('/horario', ref =>
            ref.orderByChild('profesor').equalTo(AuthenticationService.profesor.UsuarioHorario));
        return this.horarioRef;
    }

    getProfesorbyEmail(email: string): AngularFireList<Profesor> {
        this.profesor = this.db.list('/profesor', ref => ref.orderByChild('Email').equalTo(email));
        console.log(this.profesor);
        return this.profesor;
    }


    getNombre(): AngularFireList<String> {
        this.name = this.db.list('/profesores');
        return this.name;
    }

    getEmail(): AngularFireList<String> {
        this.email = this.db.list('/profesores', ref =>
            ref.equalTo(AuthenticationService.profesor.Email));
        return this.email;
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