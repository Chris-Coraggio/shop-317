import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import {HEROES} from '../mock-heroes';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {

  constructor(db: AngularFirestore) { 
    this.heroes = db.collection("heroes").valueChanges();
  }

  ngOnInit() {
  }

  heroes: Observable<any[]>;

  selectedHero: Hero;

  onSelect(hero: Hero){
    this.selectedHero = hero;
  }

}
