import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, mergeMap, mergeMapTo, retry, tap,  } from 'rxjs/operators';
import { GoogleAuthService } from 'ng-gapi';
import { Auth } from '../models/auth';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';

export interface User {
  name: string,
  email: string,
  password: string,
  repeat_password: string,
  provider: string,
}
export interface UserLogin {
  email: string,
  password: string,
  provider: string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl:string = environment.baseUrl;
  public auth: Auth;
  private auth$!: Subject<Auth>;

  public registered: boolean =false;
  // private registered$!: Subject<boolean>;

  constructor(
    private http: HttpClient,
    
  ) {
    this.auth$ = new Subject();
    this.auth = this.loadSession();
    this.auth$.next(this.auth);

    // this.registered$ = new Subject();
    this.registered = this.loadRegistered();
    // this.registered$.next(this.registered);
  }
  
  // Api interactions
  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/register`, user)
      .pipe(
        tap( // Log the result or error
          data => {
            this.storageSession(data)
            this.storageRegister();
          },
          error => {
            console.error('respuesta erronea', error)
            return null
          }
        ),
      );
  }
  login(user: UserLogin): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/login`, user)
      .pipe(
        tap( // Log the result or error
          data => this.storageSession(data),
          error => console.error('respuesta erronea', error)
        )
      );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/logout`, this.auth.token)
      .pipe(
        tap(
          data => this.destroySession(),
          error => {this.destroySession(); console.error('respuesta erronea', error)}
        )
      );
  }
  getAuth(): Observable<Auth> {
    return this.auth$.asObservable();
  }
  // getRegistered(): Observable<boolean> {
  //   return this.registered$.asObservable();
  // }
  check() {
    return this.auth && this.auth.user != null && this.auth.id == this.auth.user.id;
  }

  public storageSession(data:any) {
    if(data.data) {
      this.auth = {
        token: data.data.token,
        user : data.data.user,
        id   : data.data.user.id,
      }
      // console.log('usuario logueado', data.data)
      this.auth$.next(this.auth);
    }
    // Save to local
    localStorage.setItem('auth', JSON.stringify(this.auth));
    localStorage.setItem('token', JSON.stringify(this.auth.token));
    localStorage.setItem('provider', 'Api' );
  }

  public destroySession() {
    this.auth = { 
      id: 0,
      token:'', 
      user: { name: '', email: '', password: ''}, 
    }
    this.auth$.next(this.auth);

    localStorage.removeItem('auth');
    localStorage.removeItem('token');
    localStorage.removeItem('provider');
    localStorage.removeItem('registered');
  }

  public loadSession() :Auth{
    const varSession = localStorage.getItem('auth');
    return (varSession) ? <Auth> JSON.parse(varSession) : {token: '', id: 0, user: null};
  }

  storageRegister() {
    localStorage.setItem('registered', "true")
    this.registered = true;
    // this.registered$.next(this.registered);
  }

  loadRegistered() :boolean {
    return localStorage.getItem('registered') ? true : false;
  }
  completedRegistration() {
    localStorage.removeItem('registered');
    this.registered = false;
    // this.registered$.next(this.registered);
  }



  // GoogleAuth  //cambiado a privado para usar solamente de documentacion
  private GoogleSignIn(): void {
    //Movido al controlador para acceder a los errores
    // this.googleAuth.getAuth()
    //   .subscribe((auth) => {
    //     auth.signIn().then(res => this.signInSuccessHandler(res));
    //   }); 
  }

  async signInSuccessHandler(gUser: gapi.auth2.GoogleUser) {
    // console.log('usuario google', gUser.getBasicProfile())
    const profile = gUser.getBasicProfile()
    const id = profile.getId();
    const name = profile.getName();
    const email = profile.getEmail();
    const profile_photo = profile.getImageUrl();
    const tmpUser = {
      name: name,
      email: email,
      password: id,
      repeat_password: id,
      provider: 'google',
      google_id: id,
    }

    await this.verifyIfUserExists(tmpUser).subscribe(data => {
      // console.log('no existe usuario', data);
      this.register(tmpUser).subscribe(res => console.log('register', res))
      
    }, error => {
    
      this.login(tmpUser).subscribe(res => console.log('login', res))
      // console.log('existe usuario?', error);
    })
  }

  private verifyIfUserExists(user:any):Observable<any> {
    return this.http.post(`${this.apiUrl}/api/user-exists`, {email: user.email});
  }
}
