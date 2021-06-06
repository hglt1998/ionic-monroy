import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList,AngularFireObject } from '@angular/fire/database';
import { Profesor } from '../model/Profesor.model';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private dbPath = '/profesores';

    profesorRef: AngularFireList<Profesor> = null;

    profesorLista: AngularFireList<Profesor> = null;

    profesor : AngularFireObject<Profesor>;

    constructor(private db: AngularFireDatabase
    ) {

        this.profesorRef = db.list(this.dbPath);
        this.profesorLista = db.list(this.dbPath);
    }

    /* Este metodo recupera el objeto profesor por su email  */
    getProfesorByEmail(email: string): AngularFireList<Profesor> {
        this.profesorRef = this.db.list('/profesores', ref => ref.orderByChild('Email').equalTo(email));
        return this.profesorRef;
    }

    //Devuelve una lista con los profesores filtrados por su UsuarioHorario (deberia ser solo 1)
    getProfesorByUsuarioHorario(usuario: string):  AngularFireList<Profesor> {   
        //this.profesor = this.db.object('profesores/' + "0"); //Esto buscaria por id, pero no los sabemos
        this.profesorRef = this.db.list('/profesores', ref => ref.orderByChild('UsuarioHorario').equalTo(usuario));
        console.log("Buscando a->"+usuario);
        return this.profesorRef;
    }

    getAll(): AngularFireList<Profesor> {
        return this.profesorLista;
    }

    create(profesor: Profesor): any {
        return this.profesorRef.push(profesor);
    }

    update(key: string, value: any): Promise<void> {
        return this.profesorRef.update(key, value);
    }

    delete(key: string): Promise<void> {
        return this.profesorRef.remove(key);
    }

    deleteAll(): Promise<void> {
        return this.profesorRef.remove();
    }
}