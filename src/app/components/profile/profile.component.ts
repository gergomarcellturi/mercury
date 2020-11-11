import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../api/services/misc/authentication.service';
import {PreferenceSettings} from '../../api/interfaces/PreferenceSettings';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../api/interfaces/User';
import {AngularFirestore} from '@angular/fire/firestore';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public settings: PreferenceSettings;
  public profileForm: FormGroup;

  public get displayName(): AbstractControl { return this.profileForm.get('displayName'); }
  public get email(): AbstractControl { return this.profileForm.get('email'); }

  constructor(
    public authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private fireStore: AngularFirestore,
    private snackBar: MatSnackBar,
    private translateService: TranslateService,
    private router: Router,
  ) {
    this.authenticationService.settings$.subscribe(result => this.settings = result[0]);
    this.buildForm();
  }

  ngOnInit(): void {
  }

  public submit = (): void => {
    if (this.profileForm.invalid) return;

    this.saveProfile(this.getEntity());
  }

  public cancel = (): void => {
    this.router.navigate(['home']).then();
  }

  private buildForm = (): void => {
    this.profileForm = this.formBuilder.group({
      displayName: [this.authenticationService.user.displayName, [
        Validators.required,
      ]],
      email: [{value: this.authenticationService.user.email, disabled: this.authenticationService.user.userType === 'third-party'}, [
        Validators.required,
      ]]
    });
  }

  private getEntity = (): User => {
    const user = this.authenticationService.user;
    console.log(user);
    user.displayName = this.displayName.value as string;
    user.email = this.email.value as string;
    console.log(user);
    return user;
  }

  private saveProfile = (user: User): void => {
    const userRef = this.fireStore.doc(`users/${user.uid}`);

    userRef.update(user).then(this.snackBarMessage.bind(this, this.translateService.instant('PROFILE.SUCCESS')));
  }

  private snackBarMessage = (msg: string) => {
    this.snackBar.open(msg, this.translateService.instant('BUTTON.CLOSE'), {duration: 5000});
  }

}
