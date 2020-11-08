import { Injectable } from '@angular/core';
import {testTheme1, testTheme2, Theme} from '../../interfaces/theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private active: Theme = testTheme1;
  private availableThemes: Theme[] = [testTheme1, testTheme2];

  constructor() { }

  public getAvailableThemes(): Theme[] {
    return this.availableThemes;
  }

  public setActiveTheme(theme: Theme): void {
    this.active = theme;

    Object.keys(this.active.properties).forEach(property => {
      document.documentElement.style.setProperty(property, this.active.properties[property]);
    });
  }
}
