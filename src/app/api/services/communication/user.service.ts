import { Injectable } from '@angular/core';
import {User} from '../../interfaces/User';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private fireStore: AngularFirestore,
  ) { }

  public getUsers = (): Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> => {
    return this.fireStore.collection<User[]>('/users').get().toPromise();
  }

  public getUser = (uid: string): AngularFirestoreCollection<User> => {
    return this.fireStore.collection('/users', ref => ref.where('uid', '==', uid));
  }
}
