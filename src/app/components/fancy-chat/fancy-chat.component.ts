import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../api/interfaces/User';
import {AuthenticationService} from '../../api/services/misc/authentication.service';
import {ChatService} from '../../api/services/communication/chat.service';
import {PushNotificationsService} from 'ng-push-ivy';

@Component({
  selector: 'app-fancy-chat',
  templateUrl: './fancy-chat.component.html',
  styleUrls: ['./fancy-chat.component.css']
})
export class FancyChatComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollRef', {static: false})
  public scrollRef: ElementRef;

  public chat: Observable<User[]>;
  public users: Observable<User[]>;
  public text = '';
  public messages: {text: string, uid: string, from: string, timestamp: {seconds: number, nanoseconds: number}}[];
  private messagesLength = -1;
  public showEmojiPicker = false;
  public chatView = true;

  constructor(
    public authenticationService: AuthenticationService,
    public chatService: ChatService,
    private pushNotification: PushNotificationsService,
  ) {
    this.chatService.getChatLists().subscribe(response => {
      this.messages = response[0].messages;
      this.notify(this.messages[this.messages.length - 1]);
    });
    this.pushNotification.requestPermission();
  }

  ngOnInit(): void { }

  ngAfterViewChecked() {
    if (this.messages && this.chatView) {
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
