import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../environments/environment';
import {FirebaseApp} from '@angular/fire';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable, pipe} from 'rxjs';
import {User} from './api/dto/User';
import {AngularFirestore} from '@angular/fire/firestore';
import {map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mega-chad';

  public chat: Observable<User[]>;
  public users: Observable<User[]>;

  constructor(
    private translate: TranslateService,
    private firebase: FirebaseApp,
    private database: AngularFireDatabase,
    private db: AngularFirestore
  ) {
    translate.use(environment.defaultLang);
    this.db.collection('users').valueChanges().subscribe(console.log);
    this.chat = this.db.collection('chat').valueChanges() as Observable<User[]>;
    this.chat.forEach(console.log);
    // this.chat = this.db.collection('chat').get();

  }
}
