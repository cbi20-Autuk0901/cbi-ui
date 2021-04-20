import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlockerService } from './../services/blocker/blocker.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private blocker: BlockerService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    setTimeout(() => {
      this.blocker.on();
      console.log('on');
    }, 0);
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            setTimeout(() => {
              this.blocker.off();
            }, 0);
          }
        },
        (error) => {
          setTimeout(() => {
            this.blocker.off();
          }, 0);
        }
      )
    );
  }
}
