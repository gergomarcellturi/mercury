import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {AuthenticationService} from '../misc/authentication.service';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference} from '@angular/fire/firestore';
import {Note} from '../../interfaces/Note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(
    private authenticationService: AuthenticationService,
    private fireStore: AngularFirestore,
  ) { }

  public getNoteList = (): Observable<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> => {
    return this.authenticationService.user$.pipe(
      switchMap(user => {
        return this.fireStore.collection<Note>('notes', ref => ref.where('userUid', '==', user.uid)).get();
      }),
    );
  }

  public saveNote = (note: Note): Promise<DocumentReference> => {
    const noteRef: AngularFirestoreCollection<Note> = this.fireStore.collection('notes');
    const data = {
      noteText: note.noteText,
      noteTitle: note.noteTitle,
      timestamp: new Date(),
      userUid: this.authenticationService.user.uid,
    } as Note;
    return noteRef.add(data);
  }

  public modifyNote = (note: Note): void => {
    const noteRef: AngularFirestoreDocument<Note> = this.fireStore.doc(`notes/${note.uid}`);
    const data = {
      noteText: note.noteText,
      noteTitle: note.noteTitle,
      timestamp: new Date(),
      userUid: note.userUid,
    } as Note;
    noteRef.set(data, {merge: true}).then();
  }
}
