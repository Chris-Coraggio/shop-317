import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Image } from '../image';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs/operators';

@Injectable()
export class UploadService {

  constructor(private afStorage: AngularFireStorage, private db: AngularFirestore) { }

  private basePath: String = '/uploads';
  
  upload(event){
    var image: Image = new Image();
    image.id = this.generateID();
    image.file = event.target.files[0];
    const fileName = image.id.toString();
    var ref = this.afStorage.ref(fileName);
    this.task = ref.put(event.target.files[0]);
    this.uploadProgress = this.task.percentageChanges();
    console.log("Sanity");
    this.task.then( (result) => {
      return result.ref.getDownloadURL();
    })
    .then((url) => {
      image.url = url;
      console.log(url);
      this.saveImageToDB(image);
      alert("Image uploaded!");
    })
    .catch(err => {
      console.log(err);
    })
  }

  downloadURL: Observable<string>;
  uploadProgress: Observable<number>;
  task: AngularFireUploadTask;

  generateID(): String {
    return Math.random().toString(36).substring(2,15) + Math.random().toString(36).substring(2,15);
  }

  // Writes the file details to the realtime db
  private saveImageToDB(image: Image) {
    console.log(image);
    this.db.doc(`images/${image.id}`).set(JSON.parse(JSON.stringify(image)));
  }
}