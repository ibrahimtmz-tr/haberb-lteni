import { Uye } from './../models/uye';
import { Router } from '@angular/router';
import { FireServiceService } from './../services/fbservis.service';
import { Sonuc } from './../models/sonuc';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  sonuc: Sonuc = new Sonuc();
  yeniUye: Uye = new Uye();
  constructor(
    public fbServis: FireServiceService,
    public router: Router
  ) { }

  ngOnInit() {
  }
  KayitOl() {
    this.fbServis.UyeOl(this.yeniUye).then(d => {
      d.user.updateProfile({
        displayName: this.yeniUye.adsoyad
      }).then();
      this.yeniUye.uid = d.user.uid;
      localStorage.setItem("user", JSON.stringify(d.user))
      this.UyeEkle();
    }, err => {
      this.sonuc.islem = false;
      this.sonuc.mesaj = "Kayıt Başarısız.."
    });
  }
  UyeEkle() {
    this.fbServis.UyeEkle(this.yeniUye).then(d => {
      this.router.navigate(['/'])
    });

  }
}
