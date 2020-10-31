import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs';
import {User} from './api/interfaces/User';
import {ChatService} from './api/services/communication/chat.service';
import {AuthenticationService} from './api/services/misc/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mega-chad';

  public chat: Observable<User[]>;
  public users: Observable<User[]>;
  public text: string;
  public messages: {text: string, uid: string, from: string, timestamp: {seconds: number, nanoseconds: number}}[];

  constructor(
    public authenticationService: AuthenticationService,
    private translate: TranslateService,
    public chatService: ChatService,
  ) {
    translate.use(environment.defaultLang);
    this.chatService.getChatLists().subscribe(response => {
      this.messages = response[0].messages;
      console.log(this.messages[3].timestamp);
    });
  }

  async ngOnInit() {
  }

  public sendMessage = (): void => {
    console.log(this.text);
    if (!this.text) return;

    this.chatService.sendMessage(this.text, '1uFaAU4p6ElQ3vEIkuAA');
    this.text = '';
  }

  public isSamePerson = () => {

  }
}
