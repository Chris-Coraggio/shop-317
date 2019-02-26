import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Image } from '../image';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class UploadService {

  constructor(private afStorage: AngularFireStorage, private db: AngularFirestore) { }

  private basePath: String = '/uploads';
  
  upload(event, listId){
    var image: Image = new Image();
    image.id = this.generateID();
    image.listId = listId;
    const fileName = image.id.toString();
    var ref = this.afStorage.ref(fileName);
    const file = event.target.files[0];
    this.task = ref.put(file);
    image.fileName = file.name;
    this.uploadProgress = this.task.percentageChanges();
    this.task.then( (result) => {
      return result.ref.getDownloadURL();
    })
    .then((url) => {
      image.url = url;
      console.log(url);
      this.saveImageToDB(image);
    })
    .catch(err => {
      console.log(err);
    })
  }

  downloadURL: Observable<string>;
  uploadProgress: Observable<number>;
  task: AngularFireUploadTask;

  getUploadProgress(): Observable<number>{
    return this.uploadProgress;
  }

  generateID(): string {
    return Math.random().toString(36).substring(2,15) + Math.random().toString(36).substring(2,15);
  }

  // Writes the file details to the realtime db
  private saveImageToDB(image: Image) {
    
    if(image.listId.startsWith("VAR")){
      var varObj = new Object();
      varObj["VAR" + image.id] = new Object();
      varObj["VAR" + image.id]["img"] = JSON.parse(JSON.stringify(image));
      this.db.doc(`variations/${image.listId}`).update(varObj);
    } else {
      var imgObj = new Object();
      imgObj[image.id] = JSON.parse(JSON.stringify(image));
      this.db.doc(`images/${image.listId}`).update(imgObj);
    }
  }
}