import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { map } from 'rxjs/operators';
import { Profesor } from './model/Profesor.model';
import { LoginService } from './login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  static profesor: Profesor;
  static anyProf: Array<Profesor>;

  constructor(
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    private login: LoginService
  ) {
    AuthenticationService.profesor = new Profesor();
  }


  // Acceder con email/password
  SignIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.login.getProfesorByEmail(result.user.email).snapshotChanges().pipe(
          map(changes =>
            changes.map(c =>
              ({ key: c.payload.key, ...c.payload.val() })
            )
          )
        ).subscribe(data => {
          console.log(data);
          AuthenticationService.anyProf = data.filter(obj => {

            return obj;
          });
          //Esto no es muy elegante FIXME
          AuthenticationService.profesor.Email = AuthenticationService.anyProf[0].Email;
          AuthenticationService.profesor.Empleado = AuthenticationService.anyProf[0].Empleado;
          AuthenticationService.profesor.UsuarioHorario = AuthenticationService.anyProf[0].UsuarioHorario;
          AuthenticationService.profesor.UsuarioIdEA = AuthenticationService.anyProf[0].UsuarioIdEA;
          AuthenticationService.profesor.key = AuthenticationService.anyProf[0].key;

        });

        this.router.navigate(['/tabs']);//navega a tabs
      }).catch((error) => {
        window.alert(error.message);
      })
  }

  ForgotPassword(email) {
    return this.afAuth.sendPasswordResetEmail(email)
      .then((result) => {
        window.alert("Email enviado correctamente");
      }).catch((error) => {
        window.alert(error.message);
      })
  }

  //Registro con email/password. Esto estará deshabilitado, nadie podra registrarse por sí mismo
  SignUp(email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        window.alert("You have been successfully registered!");
        console.log(result.user);
      }).catch((error) => {
        window.alert(error.message);
      })
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
      
      
      console.log('SIGN OUT');
    })
  }

}
