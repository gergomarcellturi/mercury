import { Injectable } from '@angular/core';
import {User} from '../../dto/User';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public loggedInUser: User;

  constructor(
    private router: Router,
  ) { }

  public login = (user: User): void => {
    this.loggedInUser = user;
  }

  public logout = (): void => {
    this.loggedInUser = null;
    this.router.navigate(['']);
  }
}
