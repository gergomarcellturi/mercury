import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {AuthenticationService} from '../misc/authentication.service';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Note} from '../../interfaces/Note';
import {User} from '../../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(
    private authenticationService: AuthenticationService,
    private fireStore: AngularFirestore,
  ) { }

  public getNoteList =  (): Observable<Note[]> => {
    return this.authenticationService.user$.pipe(
      switchMap(user => {
        return this.fireStore.collection<Note>('notes', ref => ref.where('userUid', '==', user.uid)).valueChanges();
      })
    );
  }

  public saveNote = (note: Note): void => {
    const noteRef: AngularFirestoreCollection<Note> = this.fireStore.collection('notes');
    noteRef.add(note).then();
  }

  public modifyNote = (note: Note): void => {
    // const noteRef: AngularFirestoreDocument<Note> = this.fireStore.doc(`notes/${note.}`);
  }

  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.fireStore.doc(`users/${user.uid}`);
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
    return userRef.set(data, {merge: true});
  }
}
