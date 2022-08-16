import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

import { ExampleService } from './../service/example.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private fb: FormBuilder,
    private alerController: AlertController,
    private loadingController: LoadingController,
    private router: Router,
    private examp: ExampleService
  ) { }

  ngOnInit() {
  }

  public credentials: FormGroup = this.fb.group({
    firstname: ['', [Validators.required,]],
    lastname: ['', [Validators.required,]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  public async SignUp(){
    const loading = await this.loadingController.create();
    await loading.present();

    this.examp.postSignUp(this.credentials.value).subscribe(
      async (res) => {
        await loading.dismiss();
        this.router.navigateByUrl('/login', { replaceUrl: true });
      },
      async (res) => {
        await loading.dismiss();
        const alert = await this.alerController.create({
          header: 'Register Failed',
          message: res.error.error,
          buttons: ['OK']
        });
        await alert.present();
      }
    )
  }

  get firstName(){
    return this.credentials.get('firstName');
  }

  get lastName(){
    return this.credentials.get('lastName');
  }

  get email(){
    return this.credentials.get('email');
  }

  get password(){
    return this.credentials.get('password');
  }
}
