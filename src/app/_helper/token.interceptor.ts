import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../_service/token-storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private tokenStorageService: TokenStorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
	const userToken = this.tokenStorageService.getToken();
    const modifiedReq = request.clone({ 
      headers: request.headers.set('Authorization', `Bearer ${userToken}`),
    });
    return next.handle(request);
  }
}
