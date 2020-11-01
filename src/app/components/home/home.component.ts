import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../api/interfaces/User';
import {ChatService} from '../../api/services/communication/chat.service';
import {AuthenticationService} from '../../api/services/misc/authentication.service';
import {environment} from '../../../environments/environment';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('scrollRef', {static: false})
  public scrollRef: ElementRef;


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
      this.scrollRef.nativeElement.scrollIntoView({ behavior: 'smooth'});
    });
  }

  ngOnInit(): void {
  }

  public sendMessage = (): void => {
    console.log(this.text);
    if (!this.text) return;

    this.chatService.sendMessage(this.text, '1uFaAU4p6ElQ3vEIkuAA');
    this.text = '';
  }

  public isSamePerson = () => {

  }

  public onKeyPressed(event) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }
}
