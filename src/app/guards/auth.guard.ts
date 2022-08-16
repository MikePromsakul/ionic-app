import { ExampleService } from './../service/example.service';
import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanLoad {

  constructor(
    private examp: ExampleService,
    private router: Router
  ) { }

  canLoad() {
    return this.examp.isAuthenticated.pipe(
      filter(val => val !== null),
      take(1),
      map(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigateByUrl('/login');
          return false;
        }
        return true;
      })
    );
  }
}
