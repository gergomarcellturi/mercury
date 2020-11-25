import { Injectable } from '@angular/core';
import {Theme} from '../../interfaces/Theme';
import {ColorTheme, testTheme1, testTheme2} from '../../interfaces/ColorTheme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private active: Theme = {color: testTheme1, stylish: true};
  private colorThemes: ColorTheme[] = [testTheme1, testTheme2];

  constructor() { }

  public getActiveTheme(): Theme {
    return this.active;
  }

  public getColorThemes(): ColorTheme[] {
    return this.colorThemes;
  }

  public setStyle(isStylish: boolean): void {
    this.active.stylish = isStylish;
  }

  public setColorTheme(colorTheme: ColorTheme): void {
    this.active.color = colorTheme;

    Object.keys(this.active.color.properties).forEach(property => {
      document.documentElement.style.setProperty(property, this.active.color.properties[property]);
    });
  }
}
