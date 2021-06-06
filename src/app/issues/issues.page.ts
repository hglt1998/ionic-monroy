import { Component } from '@angular/core';
import { EmailComposer, EmailComposerOptions } from '@ionic-native/email-composer/ngx';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { ToastController } from '@ionic/angular'
import { Issue } from '../model/Issue.model';
import { IssueService } from './issues.service';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.page.html',
  styleUrls: ['./issues.page.scss'],
})
export class IssuesPage {

  constructor(
    public formBuilder: FormBuilder,
    private emailComposer: EmailComposer,
    public toastController: ToastController,
    public issueService: IssueService) {

    this.ionicForm = formBuilder.group({
      email: ['', Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
      subject: ['', Validators.compose([Validators.maxLength(40), Validators.required])],
      body: ['', Validators.compose([Validators.minLength(5), Validators.required])]
    })
   }

   issue: Issue = new Issue();

  ionicForm: FormGroup = new FormGroup({
    email: new FormControl()
  })

  onInit() {
    this.emailComposer.getClients().then((apps: []) => {
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      header: 'Enviado con éxito',
      message:'Gracias por enviar su mensaje',
      position:'bottom',
      buttons: [
        {
          side: 'start',
          text: 'Cerrar',
        }
      ]
    });
    await toast.present();
  }

  async presentAlertToast() {
    const toast = await this.toastController.create({
      header: 'Campos inválidos',
      message:'Debe rellenar los campos correctamente',
      position:'bottom',
      color:'warning',
      duration: 2500,
      animated: true
    });
    await toast.present();
  }


  getDate(e) {
    let date = new Date(e.target.value).toISOString().substring(0, 10);
    this.ionicForm.get('dob').setValue(date, {
      onlyself: true
    })
  }

  submitForm() {
    if (this.ionicForm.value.email == "" ||
      this.ionicForm.value.subject == "" ||
      this.ionicForm.value.body == "" ){
      this.presentAlertToast();
    } else {
      this.issue.email = this.ionicForm.value.email;
      this.issue.subject = this.ionicForm.value.subject;
      this.issue.body = this.ionicForm.value.body;

      this.issueService.create(this.issue);
      this.presentToast();
      this.ionicForm.reset();
    }

  }

  intentToSend(to: string) {
    const email: EmailComposerOptions = {
      to: to,
      isHtml: false
    };
      this.emailComposer.open(email);
    
  }
  
  

}
