import {Component, OnInit} from '@angular/core';
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
export class HomeComponent implements OnInit {

  public toggled = false;
  public collapseSidebar = false;
  public chatView = true;
  public isStylish: boolean;

  constructor(
    public authenticationService: AuthenticationService,
    private translate: TranslateService,
    public chatService: ChatService,
    private pushNotification: PushNotificationsService,
    private themeService: ThemeService,
    ) {
    translate.use(environment.defaultLang);
    this.pushNotification.requestPermission();
  }

  ngOnInit(): void {
    this.themeService.setColorTheme(this.themeService.getColorThemes()[0]);
    this.themeService.setStyle(true);
    this.isStylish = this.themeService.getActiveTheme().stylish;
  }

}
