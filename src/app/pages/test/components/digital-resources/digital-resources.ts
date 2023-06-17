import { ContentHeader } from "../../models/ContentHeader";
import { AudiosComponent } from "./audios/audios.component";

export const CONTENT_HEADER: ContentHeader = {
  title: 'Recursos digitales',
  subtitle: 'Para una mejor experiencia, utiliza los siguientes filtros para ubicar los recursos que deseas consultar.',
}

export const TABS: Tab[] = [
  {
    textLabel: 'Audios',
    iconLabel: 'far fa-volume',
    iconLabelActive: 'fas fa-volume',
    title: 'Audios',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    textLabel: 'Videos',
    iconLabel: 'far fa-video',
    iconLabelActive: 'fas fa-video',
    title: 'Videos',
    subtitle: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    textLabel: 'Imprimibles',
    iconLabel: 'far fa-print',
    iconLabelActive: 'fas fa-print',
    title: 'Imprimibles',
    subtitle: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    textLabel: 'Interactivos',
    iconLabel: 'far fa-chart-network',
    iconLabelActive: 'fas fa-chart-network',
    title: 'Interactivos',
    subtitle: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    textLabel: 'Libros de texto',
    iconLabel: 'far fa-file-pdf',
    iconLabelActive: 'fas fa-file-pdf',
    title: 'Libros de texto',
    subtitle: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    textLabel: 'Guías del profesor',
    iconLabel: 'far fa-book-user',
    iconLabelActive: 'fas fa-book-user',
    title: 'Guías del profesor',
    subtitle: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    textLabel: 'Libros de texto descargables',
    iconLabel: 'far fa-file-plus',
    iconLabelActive: 'fas fa-file-plus',
    title: 'Libros de texto descargables',
    subtitle: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    textLabel: 'Libros exportación',
    iconLabel: 'far fa-file-import',
    iconLabelActive: 'fas fa-file-import',
    title: 'Libros exportación',
    subtitle: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
];

export interface Tab {
  textLabel: string;
  iconLabel?: string;
  iconLabelActive?: string;
  title?: string;
  subtitle?: string;
};