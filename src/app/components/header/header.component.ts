import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthenticationService} from '../../api/services/misc/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() chatView: boolean;
  @Output() chatViewChange: EventEmitter<boolean> = new EventEmitter();

  constructor(
    public authenticationService: AuthenticationService,
  ) { }

  ngOnInit(): void {
  }

  public action(value: boolean) {
    this.chatView = value;
    this.chatViewChange.emit(this.chatView);
  }
}
