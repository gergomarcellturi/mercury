import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {User} from '../../interfaces/User';
import {switchMap} from 'rxjs/operators';
import {auth} from 'firebase';
import {PreferenceSettings} from '../../interfaces/PreferenceSettings';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public user$: Observable<User>;
  public user: User;
  public settings$: Observable<PreferenceSettings[]>;
  public settings: PreferenceSettings;

  constructor(
    private fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private router: Router,
  ) {
    this.user$ = this.fireAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.settings$ = this.fireStore.collection<PreferenceSettings>(
            'settings',
            ref => ref.where('userUid', '==', user.uid),
          ).valueChanges();
          this.settings$.subscribe(result => result[0] = this.settings);
          this.fireStore.doc<User>(`users/${user.uid}`).valueChanges().subscribe(result => this.user = result);
          return this.fireStore.doc<User>(`users/${user.uid}`).valueChanges();
        }
        else return of(null);
      })
    );
  }

  public googleSignIn = async (): Promise<void> => {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.fireAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  public signOut = async (): Promise<boolean> => {
    await this.fireAuth.signOut();
    return this.router.navigate(['/login']);
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
