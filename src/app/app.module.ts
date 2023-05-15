import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { SidebarModule } from './shared/components/sidebar/sidebar.module';

import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';//HTTP INTERCEPTORS PARA ENVIO DE TOKEN AL BACK
import { AdminInterceptor } from './shared/interceptors/admin-interpector';//Interceptor creado

import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { MessageErrorComponent } from './pages/auth/message-error/message-error.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MessageErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SidebarModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    //el interceptor modificará cada petición que se haga al servidor siempre y cuando exista un token.
    { provide: HTTP_INTERCEPTORS, useClass: AdminInterceptor, multi: true }, // se declara el interceptor, multi:true permitirá agregar más interceptors si lo requerímos y no sobre escribir sobre el ya hecho
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
