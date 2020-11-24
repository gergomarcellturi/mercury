import { Injectable } from '@angular/core';
import {testTheme1, testTheme2, Theme} from '../../interfaces/theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private active: Theme = testTheme1;
  private availableThemes: Theme[] = [testTheme1, testTheme2];

  constructor() { }

  public getActiveTheme(): Theme {
    return this.active;
  }

  public getAvailableThemes(): Theme[] {
    return this.availableThemes;
  }

  public setStyle(isStylish: boolean): void {
    this.active.stylish = isStylish;
  }

  public setColorTheme(properties: any): void {
    this.active.properties = properties;

    Object.keys(this.active.properties).forEach(property => {
      document.documentElement.style.setProperty(property, this.active.properties[property]);
    });
  }
}
