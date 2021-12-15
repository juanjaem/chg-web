import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaginasModule } from './paginas/paginas.module';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterpector } from './nucleo/interceptores/token/token.interceptor';
import { HttpErrorInterceptorModule } from './nucleo/interceptores/http-error/http-error-interceptor.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, HttpClientModule, PaginasModule, HttpErrorInterceptorModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterpector,
      multi: true,
      deps: [HttpClient]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
