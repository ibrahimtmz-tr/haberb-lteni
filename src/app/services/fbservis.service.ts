import { Icerik } from '../models/content';
import { Kategori } from './../models/kategori';
import { Uye } from './../models/uye';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class FireServiceService {
  private dbIcerik = '/Icerikler';
  private dbUye = '/Uyeler';
  private dbKategori = '/Kategoriler';
  icerikRef: AngularFireList<Icerik> = null;
  uyeRef: AngularFireList<Uye> = null;
  kategoriRef: AngularFireList<Kategori> = null;

  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth
  ) {
    this.icerikRef = db.list(this.dbIcerik);
    this.uyeRef = db.list(this.dbUye);
    this.kategoriRef = db.list(this.dbKategori);
  }

  OturumAc(mail: string, parola: string) {
    return this.afAuth.signInWithEmailAndPassword(mail, parola);
  }

  OturumKontrol() {
    if (localStorage.getItem("user")) {
      return true;
    }
    else {
      return false;
    }
  }
  OturumKapat() {
    return this.afAuth.signOut();
  }

  UyeEkle(uye: Uye) {
    return this.uyeRef.push(uye);
  }
  UyeOl(uye: Uye) {
    return this.afAuth.createUserWithEmailAndPassword(uye.mail, uye.parola);
  }
  HaberEkle(i: Icerik): any {
    return this.icerikRef.push(i);
  }
  HaberDuzenle(icerik: Icerik) {
    return this.icerikRef.update(icerik.key, icerik);
  }
  HaberSil(key: string): Promise<void> {
    return this.icerikRef.remove(key);
  }
  HaberListe() {
    return this.icerikRef;
  }
  HaberFiltrele(kategoriId) {
    return this.icerikRef;
  }
  KategoriEkle(k: Kategori): any {
    return this.kategoriRef.push(k);

  }
  KategoriListe() {
    return this.kategoriRef;
  }
  UrunByKey(key: string) {
    return this.db.object("/Icerikler/" + key);
  }
}