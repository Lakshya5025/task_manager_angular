import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authservice: AuthService) {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.authservice.getToken();
    console.log('this is token', token);
    if (!token) {
      return next.handle(request);
    }
    const authRequest = request.clone({
      setHeaders: {
        Authorization: token,
      },
    });

    return next.handle(authRequest);
  }
}
