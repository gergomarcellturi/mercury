import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../api/services/misc/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public authenticationService: AuthenticationService,
  ) { }

  ngOnInit(): void {
  }

}
