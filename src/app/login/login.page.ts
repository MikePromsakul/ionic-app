import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

import { ExampleService } from './../service/example.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

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
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  public async SignIn(){
    const loading = await this.loadingController.create();
    await loading.present();

    this.examp.postSignIn(this.credentials.value).subscribe(
      async (res) => {
        await loading.dismiss();
        this.router.navigateByUrl('/home', { replaceUrl: true });
      },
      async (res) => {
        await loading.dismiss();
        const alert = await this.alerController.create({
          header: 'Login Failed',
          message: res.error.error,
          buttons: ['OK']
        });
        await alert.present();
      }
    )
  }

  get email(){
    return this.credentials.get('email');
  }

  get password(){
    return this.credentials.get('password');
  }

}
