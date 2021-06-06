import * as firebase from 'firebase';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { AngularDelegate } from '@ionic/angular';
import { AuthenticationService } from '../authentication.service';
import { $ } from 'protractor';
import { Profesor } from '../model/Profesor.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  
  profesor: Profesor;

  constructor(private profileService: ProfileService) { 
    // this.getFamilyMembers().then( profesores => this.profesor.Email = profesores);
  }

  ngOnInit() {

    var url = 'https://monroypasen-default-rtdb.europe-west1.firebasedatabase.app/profesores.json?orderBy="Email"&equalTo="elonmusk@iescristobaldemonroy.es"'

        

    var name = new XMLHttpRequest();
    name.open("GET", url, false);
    // console.log(name); 
    // console.log('PROFESOR: ' + this.profesor)

    // this.profileService.getProfesorbyEmail(this.profesor.email);
  }

  getFamilyMembers() {
    return firebase.firestore().collection('profesores').where("Email", "==", "ElonMusk@iescristobaldemonroy.es").get();
  }
}
