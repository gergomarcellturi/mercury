import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../environments/environment';
import {FirebaseApp} from '@angular/fire';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from './api/interfaces/User';

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
  }
}
