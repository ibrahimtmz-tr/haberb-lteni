import { ResimComponent } from './resim/resim.component';
import { HaberdetayComponent } from './haberdetay/haberdetay.component';
import { HomeComponent } from './home/home.component';
import { IcerikComponent } from './icerik/icerik.component';
import { HaberduzenleComponent } from './haberduzenle/haberduzenle.component';
import { KategoriekleComponent } from './kategoriekle/kategoriekle.component';
import { HaberekleComponent } from './haberekle/haberekle.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { KayıteklesilComponent } from './kayıteklesil/kayıteklesil.component';

const redirectLogin = () => redirectUnauthorizedTo(['login']);
const routes: Routes = [
  {
    path: 'haberekle',
    component: HaberekleComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectLogin
    }
  },

  {
    path: 'kategoriekle',
    component: KategoriekleComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectLogin
    }
  },

  {
    path: 'admin',
    component: HomeComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectLogin
    }
  },

  {
    path: 'haberdüzenle',
    component: HaberduzenleComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectLogin
    }
  },



  {
    path: 'resimekle',
    component: ResimComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectLogin
    }
  },


  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: IcerikComponent },
  { path: 'kategori/:kategoriId', component: IcerikComponent },
  { path: 'urundetay/:key', component: HaberdetayComponent },
  { path: 'resimekle', component: ResimComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
