import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Multimedia, TYPES_MULTIMEDIA } from '@app/pages/test/models/Multimedia';

@Component({
  selector: 'ui-multimedia-dialog',
  templateUrl: './multimedia-dialog.html',
  styleUrls: ['./multimedia-dialog.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'wrapper-multimedia-dialog'
  }
})
export class UIMultimediaDialog implements OnInit {
  pageSecure: SafeResourceUrl;

  constructor(
    private domSanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<UIMultimediaDialog>,
    @Inject(MAT_DIALOG_DATA) public multimedia: Multimedia,
  ) {
    this.pageSecure = this.domSanitizer.bypassSecurityTrustResourceUrl(multimedia.url);
    this.pageSecure
  }

  ngOnInit() {
  }

  showAudio() {
    return this.multimedia.type === TYPES_MULTIMEDIA.audio;
  }

  showVideo() {
    return this.multimedia.type === TYPES_MULTIMEDIA.video;
  }

  showDocument() {
    return this.multimedia.type === TYPES_MULTIMEDIA.document;
  }

  initTransaction() {
    if (this.multimedia.type === TYPES_MULTIMEDIA.link) {
      // REDIRECT A TO LINK linkButtonDownload
    } else {
      // inicar la descarga del recurso linkButtonDownload / cerrar modal ??
    }
  }

  closeDialog() { this.dialogRef.close(); }


}

