import { Injectable } from '@angular/core';
import {AuthenticationService} from '../misc/authentication.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import * as firebase from 'firebase';
import {ChatRoom} from '../../interfaces/ChatRoom';

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
  public getChatLists =  (): Observable<ChatRoom[]> => {
    return this.authenticationService.user$.pipe(
      switchMap(user => {
        return this.fireStore.collection<ChatRoom>('chat', ref => ref.where('participants', 'array-contains', user.uid)).valueChanges();
    })
    );
  }

  public sendMessage = (text: string, chatUid: string ): void => {
    const chatRef = this.fireStore.doc(`chat/${chatUid}`);

    this.authenticationService.user$.subscribe(user => {
      const data = {
        uid: user.uid,
        from: user.displayName,
        text,
        timestamp: new Date(),
      };
      chatRef.update(
        {
          messages: firebase.firestore.FieldValue.arrayUnion(data),
        }
      ).then();
    });
  }
}
