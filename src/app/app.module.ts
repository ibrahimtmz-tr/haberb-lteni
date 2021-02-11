import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HaberekleComponent } from './haberekle/haberekle.component';
import { KategoriekleComponent } from './kategoriekle/kategoriekle.component';
import { KayıteklesilComponent } from './kayıteklesil/kayıteklesil.component';
import { HaberduzenleComponent } from './haberduzenle/haberduzenle.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { KategoriComponent } from './kategori/kategori.component';
import { IcerikComponent } from './icerik/icerik.component';
import { HaberdetayComponent } from './haberdetay/haberdetay.component';
import { ResimComponent } from './resim/resim.component';


@NgModule({
  declarations: [			
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HaberekleComponent,
    KategoriekleComponent,
    KayıteklesilComponent,
    HaberduzenleComponent,
    HomeComponent,
    NavComponent,
    KategoriComponent,
      IcerikComponent,
      HaberdetayComponent,
      ResimComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
