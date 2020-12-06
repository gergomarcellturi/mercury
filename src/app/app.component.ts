import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs';
import {User} from './api/interfaces/User';
import {ChatService} from './api/services/communication/chat.service';
import {AuthenticationService} from './api/services/misc/authentication.service';
import {Message} from './api/interfaces/Message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mega-chad';

  constructor(
    public authenticationService: AuthenticationService,
    private translate: TranslateService,
    public chatService: ChatService,
  ) {
    translate.use(environment.defaultLang);
  }

  async ngOnInit() {
  }
}
