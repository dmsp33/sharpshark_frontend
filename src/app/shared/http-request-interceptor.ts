import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      
      let token = localStorage.getItem('token')
      if(token)  token = JSON.parse(token) 
      // console.log('tengo el token', token)

      req = req.clone({
        headers: new HttpHeaders({ 
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }),
        withCredentials: true
      });
      
      return next.handle(req);
  }
}