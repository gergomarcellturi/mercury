import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MessageDialogComponent } from './shared/dialogs/message-dialog/message-dialog.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { PasswordReminderComponent } from './components/login/dialogs/password-reminder/password-reminder.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NotesComponent } from './components/notes/notes.component';
import { AboutComponent } from './components/about/about.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {AngularSplitModule} from 'angular-split';
import {FormsModule} from '@angular/forms';
import {IconsModule} from './icons/icons.module';
import {PickerModule} from '@ctrl/ngx-emoji-mart';
import {NgxEmojModule} from 'ngx-emoj';
import {EmojiModule} from '@ctrl/ngx-emoji-mart/ngx-emoji';

function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/translations/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MessageDialogComponent,
    RegistrationComponent,
    PasswordReminderComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    NotesComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AngularSplitModule.forRoot(),
    AngularFireModule.initializeApp(environment.fireBaseConfig),
    AngularFireDatabaseModule,
    HttpClientModule,
    AppRoutingModule,
    IconsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    FormsModule,
    PickerModule,
    NgxEmojModule,
    EmojiModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
