import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { Storage } from '@capacitor/storage';

const TOKEN_KEY = 'my-token';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {

  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = "";

  constructor(
    private http: HttpClient
  ) { 
    this.loadToken();
   }

  async loadToken(){
    const token = await Storage.get({ key: TOKEN_KEY });
    if(token && token.value){
      this.token = token.value;
      this.isAuthenticated.next(true);
    }else{
      this.isAuthenticated.next(false);
    }
  }

  public postSignUp(data: any){
    return this.http.post('http://localhost:1021/user/signup', data);
  }

  public postSignIn(credentials: { email,password }){
    return this.http.post('http://localhost:1021/user/signin',credentials).pipe(
      map((data: any ) => data.token),
      switchMap(token => {
        return from(Storage.set({ key: TOKEN_KEY, value: token }));
      }),
      tap(_ => {
        this.isAuthenticated.next(true);
      })
    )
  }

  public logout(): Promise<void> {
    this.isAuthenticated.next(false);
    return Storage.remove({ key: TOKEN_KEY });
  }

  public getExample(){
    return this.http.get('http://localhost:1021/example/getexample');
  }

}
