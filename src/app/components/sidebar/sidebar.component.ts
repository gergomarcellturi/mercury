import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChatService} from '../../api/services/communication/chat.service';
import {ChatRoom} from '../../api/interfaces/ChatRoom';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() collapsed: boolean;
  @Input() isStylish: boolean;
  @Output() collapsedChange: EventEmitter<boolean> = new EventEmitter();

  public chatrooms: ChatRoom[];

  constructor(
    public chatService: ChatService,
  ) {
    this.chatService.getChatLists().subscribe(response => this.chatrooms = response);
  }

  ngOnInit(): void {
  }

  public action() {
    this.collapsed = !this.collapsed;
    this.collapsedChange.emit(this.collapsed);
  }

}
