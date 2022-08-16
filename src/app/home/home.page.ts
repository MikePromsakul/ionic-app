import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../guards/auth.guard';
import { ExampleService } from '../service/example.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private authGuard: AuthGuard,
    private examp: ExampleService
  ) {}

  ngOnInit() {
    this.authGuard.canLoad();
  }

  public async logout(){
    await this.examp.logout();
    location.href = "/login";
  }

}
