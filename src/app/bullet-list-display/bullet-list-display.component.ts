import { Component, OnInit, Injectable, Input, forwardRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import { Observable } from 'rxjs';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'bulletListDisplay',
  templateUrl: './bullet-list-display.component.html',
  styleUrls: ['./bullet-list-display.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BulletListDisplayComponent),
      multi: true
    }
  ]
})
@Injectable()
export class BulletListDisplayComponent implements OnInit {

  constructor(db: AngularFirestore) {
    this.db = db;
  }

  ngOnInit() {
    console.log(this.currentBulletListId);
    if(this.currentBulletListId != ""){
      this.bulletList = this.db.doc(`bullets/${this.currentBulletListId}`).valueChanges();
    }
  }

  db: AngularFirestore;
  bulletList: Observable<{}>;
  @Input('list-id') currentBulletListId: String = "";

  getCurrentBulletListId(): String {
    return this.currentBulletListId;
  }

}
