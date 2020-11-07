import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../api/services/misc/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public authenticationService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  public loginWithGoogle = async (): Promise<void> => {
    await this.authenticationService.googleSignIn();
    this.router.navigate(['/home']).then();
  }

}
