import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Check if the request URL is not for login or register
    if (
      !request.url.includes('/authenticate') &&
      !request.url.includes('/register')
    ) {
      // Retrieve the JWT token from local storage
      const jwtToken = localStorage.getItem('jwtToken');

      // Clone the request and add the JWT token to the headers
      if (jwtToken) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${jwtToken}`
          }
        });
      }
    }

    // Pass the modified request to the next handler
    return next.handle(request);
  }
}
