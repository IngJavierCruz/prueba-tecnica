import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

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

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.changeTheme(SYSTEM_THEMES.valladolid);
    this.registerIcons();

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

  registerIcons() {
    const ICONS = [
      {
        icon: 'bell-on',
        path: '../assets/icons/bell-on.svg',
      },
      {
        icon: 'envelope-open-text',
        path: '../assets/icons/envelope-open-text.svg',
      },
      {
        icon: 'edit',
        path: '../assets/icons/edit.svg',
      },
      {
        icon: 'sign-out',
        path: '../assets/icons/sign-out.svg',
      },
    ];

    ICONS.forEach((x) => {
      this.matIconRegistry.addSvgIcon(x.icon, this.domSanitizer.bypassSecurityTrustResourceUrl(x.path));
    })
  }
}
