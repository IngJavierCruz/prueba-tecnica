import { ContentHeader } from "./ContentHeader";

export enum TYPES_MULTIMEDIA {
  audio,
  video,
  document,
  link
}

export interface Multimedia extends ContentHeader {
  sections: ContentHeader[];
  type: TYPES_MULTIMEDIA;
  url: string;
  showButtonDownload: boolean;
  linkButtonDownload?: string;
  labelButtonDownload?: string;
}
