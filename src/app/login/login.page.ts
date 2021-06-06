import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  login(email, password) {
    console.log("Probando login de: "+email+"/"+password);
    this.authenticationService.SignIn(email, password); //Para pruebas  jorge.tarancon@iescristobaldemonroy.es
                                                        //              123456
  }

}
