import { Injectable } from '@angular/core';
import {AuthenticationService} from '../misc/authentication.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ChatService {



  constructor(
    private authenticationService: AuthenticationService,
    private fireStore: AngularFirestore,
  ) { }

  /**
   * Visszaadja a bejelentkezett felhasználóhoz tartozó chat-beszélgetéseket
   */
  public getChatLists =  (): Observable<any> => {
    return this.authenticationService.user$.pipe(
      switchMap(user => {
        return this.fireStore.collection('chat', ref => ref.where('participants', 'array-contains', user.uid)).valueChanges();
    })
    );
  }

  public sendMessage = (text: string, chatUid: string ): void => {
    const arrayUnion = firebase.firestore.FieldValue.arrayUnion;
    const chatRef = this.fireStore.doc(`chat/${chatUid}`);

    this.authenticationService.user$.subscribe(user => {
      console.log(user);
      const data = {
        uid: user.uid,
        from: user.displayName,
        text,
        timestamp: new Date(),
      };
      console.log(data);
      chatRef.update(
        {
          messages: arrayUnion(data),
        }
      ).then();
    });
  }
}
