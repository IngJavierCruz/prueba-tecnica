import { Component } from '@angular/core';

const SYSTEM_THEMES = {
  'ra': 'theme-ra',
  'valladolid': 'theme-valladolid',
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'challenge';

  constructor() {
    this.changeTheme(SYSTEM_THEMES.valladolid);

    // setTimeout(() => {
    //   this.changeTheme(SYSTEM_THEMES.ra);
    // }, 5000);
  }

  changeTheme(system: string) {
    const themeCurrent = this.findThemeCurrent();
    this.getElementRef().classList.remove(themeCurrent);
    this.getElementRef().classList.add(system);
  }

  findThemeCurrent() {
    if (this.getElementRef().classList.contains(SYSTEM_THEMES.ra)) {
      return SYSTEM_THEMES.ra;
    } else if (this.getElementRef().classList.contains(SYSTEM_THEMES.valladolid)) {
      return SYSTEM_THEMES.valladolid;
    } else {
      return SYSTEM_THEMES.ra;
    }
  }

  getElementRef() {
    return document.documentElement;
  }
}
