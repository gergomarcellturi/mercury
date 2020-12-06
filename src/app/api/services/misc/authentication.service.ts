import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {User} from '../../interfaces/User';
import {switchMap} from 'rxjs/operators';
import {auth} from 'firebase';
import {PreferenceSettings} from '../../interfaces/PreferenceSettings';
import {ThemeService} from './theme.service';

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
    private themeService: ThemeService,
  ) {
    this.user$ = this.fireAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.settings$ = this.fireStore.collection<PreferenceSettings>(
            'settings',
            ref => ref.where('userUid', '==', user.uid),
          ).valueChanges();
          this.settings$.subscribe(result => {
            this.settings = result[0];
            if (this.settings.theme) {
              this.themeService.setColorTheme(
                this.themeService.getColorThemes().find(theme => theme.name === this.settings.theme));
            } else {
              this.themeService.setColorTheme(this.themeService.getColorThemes()[0]);
            }
            if (this.settings.stylish) {
              this.themeService.setStyle(this.settings.stylish);
            } else {
              this.themeService.setStyle(false);
            }
          });
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

  public saveTheme = (preferenceSettings: PreferenceSettings ): void => {
    this.getTheme().subscribe(settings => {
      const setting: firebase.firestore.DocumentData = settings.docs[0];
      const newSetting = {} as PreferenceSettings;
      Object.keys(setting.data()).forEach(key => {
        newSetting[key] = setting.data()[key];
      });
      newSetting.stylish = preferenceSettings.stylish;
      newSetting.theme = preferenceSettings.theme;
      setting.ref.set(newSetting, {merge: true}).then();
    });
  }

  public getTheme = (): Observable<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> => {
    return this.fireStore.collection<PreferenceSettings>(
      'settings',
      ref => ref.where('userUid', '==', this.user.uid)).get();
  }

  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.fireStore.doc(`users/${user.uid}`);
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
    return userRef.set(userData, {merge: true});
  }
}
