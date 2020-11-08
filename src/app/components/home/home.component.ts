import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../api/interfaces/User';
import {ChatService} from '../../api/services/communication/chat.service';
import {AuthenticationService} from '../../api/services/misc/authentication.service';
import {environment} from '../../../environments/environment';
import {TranslateService} from '@ngx-translate/core';
import {PushNotificationsService} from 'ng-push-ivy';
import {ThemeService} from '../../api/services/misc/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollRef', {static: false})
  public scrollRef: ElementRef;

  toggled = false;
  public chat: Observable<User[]>;
  public users: Observable<User[]>;
  public text = '';
  public messages: {text: string, uid: string, from: string, timestamp: {seconds: number, nanoseconds: number}}[];
  private messagesLength = -1;
  public showEmojiPicker = false;
  public collapseSidebar = false;
  public chatView = true;

  constructor(
    public authenticationService: AuthenticationService,
    private translate: TranslateService,
    public chatService: ChatService,
    private pushNotification: PushNotificationsService,
    private themeService: ThemeService,
    ) {
    translate.use(environment.defaultLang);
    this.chatService.getChatLists().subscribe(response => {
      this.messages = response[0].messages;
      this.notify(this.messages[this.messages.length - 1]);
    });
    this.pushNotification.requestPermission();
  }

  ngOnInit(): void {
    this.themeService.setActiveTheme(this.themeService.getAvailableThemes()[1]);
  }

  ngAfterViewChecked() {
    if (this.messages) {
      const chatElements = document.getElementsByClassName('chat-container').item(0);
      const scrollDownPerc = chatElements.scrollTop / chatElements.scrollHeight;
      if (this.messages.length !== this.messagesLength && scrollDownPerc > .8) {
        this.messagesLength = this.messages.length;
        this.scrollRef.nativeElement.scrollIntoView({behavior: 'smooth'});
      }
    }
  }

  public sendMessage = (): void => {
    console.log(this.text);
    if (!this.text) return;

    this.chatService.sendMessage(this.text, '1uFaAU4p6ElQ3vEIkuAA');
    this.text = '';
  }

  public showMessageSender(index: number): boolean {
    return index > 0 ? this.messages[index].uid !== this.messages[index - 1].uid : true;
  }

  public trackByUid(index, item) {
    return item.uid;
  }

  public toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  public addEmoji(event) {
    const { text } = this;
    this.text = `${text}${event.emoji.native}`;
    this.showEmojiPicker = false;
  }

  private notify({uid, from, text}) {
    this.authenticationService.user$.subscribe(user => {
      if (user.uid === uid || document.hasFocus()) {
        return;
      }
      this.pushNotification.create(from, {body: text}).subscribe(
        res => console.log(res),
        err => console.log(err)
      );
    });
  }
}
