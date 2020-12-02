import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {AuthenticationService} from '../misc/authentication.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Note} from '../../interfaces/Note';

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
}
