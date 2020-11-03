import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
export class HomeComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollRef', {static: false})
  public scrollRef: ElementRef;

  toggled = false;
  public chat: Observable<User[]>;
  public users: Observable<User[]>;
  public text = '';
  public messages: {text: string, uid: string, from: string, timestamp: {seconds: number, nanoseconds: number}}[];
  private messagesLenght = -1;
  public rightSidebar = 80;
  public leftSidebar = 20;

  constructor(
    public authenticationService: AuthenticationService,
    private translate: TranslateService,
    public chatService: ChatService,
    ) {
    translate.use(environment.defaultLang);
    this.chatService.getChatLists().subscribe(response => {
      this.messages = response[0].messages;
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewChecked() {
    if (this.messages) {
      const chatElements = document.getElementsByClassName('chat-container').item(0);
      const scrollDownPerc = chatElements.scrollTop / chatElements.scrollHeight;
      if (this.messages.length !== this.messagesLenght && scrollDownPerc > .8) {
        this.messagesLenght = this.messages.length;
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

  public onKeyPressed(event) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }

  handleSelection(event) {
    this.text += event.char;
  }

  public showMessageSender(index: number): boolean {
    return index > 0 ? this.messages[index].uid !== this.messages[index - 1].uid : true;
  }

  public trackByUid(index, item) {
    return item.uid;
  }

  public sidebarAction() {
    if (this.leftSidebar === 20) {
      this.leftSidebar = 5;
      this.rightSidebar = 95;
    } else {
      this.leftSidebar = 20;
      this.rightSidebar = 80;
    }
  }
}
