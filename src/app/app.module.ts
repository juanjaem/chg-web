import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaginasModule } from './paginas/paginas.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpErrorInterceptorModule } from './nucleo/interceptores/http-error/http-error-interceptor.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PaginasModule,
    HttpErrorInterceptorModule,
    MatDialogModule,
    MatMenuModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
