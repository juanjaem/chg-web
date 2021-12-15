import { HttpErrorInterceptor } from './http-error.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatSnackBarModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
      deps: [MatSnackBar]
    }
  ]
})
export class HttpErrorInterceptorModule {}
