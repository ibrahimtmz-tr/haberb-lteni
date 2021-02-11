import { Resim } from './../models/resim';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StServiceService {
  basePath = "/Resimler";
  constructor(
    public storage: AngularFireStorage,
    public db: AngularFireDatabase
  ) { }
  ResimYükleStorage(resim: Resim) {
    const resimYol = this.basePath + "/" + resim.file.name;
    const storageRef = this.storage.ref(resimYol);
    const yukleTask = this.storage.upload(resimYol, resim.file);
    yukleTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          resim.url = downloadURL;
          resim.adi = resim.file.name;
          this.ResimVeriYaz(resim);
        });
      })
    ).subscribe();
    return yukleTask.percentageChanges();
  }
  ResimVeriYaz(resim: Resim) {
    this.db.list(this.basePath).push(resim);
  }

  ResimListele() {
    return this.db.list(this.basePath);
  }
  ResimSil(resim: Resim) {
    this.ResimVeriSil(resim).then(() => {
      this.ResimStorageSil(resim);
    });
  }
  ResimStorageSil(resim: Resim) {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(resim.adi).delete();
  }
  ResimVeriSil(resim: Resim) {
    return this.db.list(this.basePath).remove(resim.key);
  }
}
