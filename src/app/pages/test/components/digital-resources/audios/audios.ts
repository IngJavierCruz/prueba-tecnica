import { Multimedia, TYPES_MULTIMEDIA } from "@app/pages/test/models/Multimedia";

export const DATA: Multimedia[] = [
  {
    iconLabel: 'far fa-waveform',
    title: 'Nulla facilisi dignissim',
    subtitle: '• Nivel • Grado • Materia',
    type: TYPES_MULTIMEDIA.audio,
    sections: [
      {
        title: 'Propósito',
        subtitle: 'Facilisi etiam dignissim diam quis. Sed sed risus pretium quam vulputate dignissim suspendisse',
      },
      {
        title: 'Campo de formación',
        subtitle: 'Nulla facilisi morbi tempus iaculis urna',
      },
    ],
    url: 'www.facebook.com',
    showButtonDownload: false,
    labelButtonDownload: 'Descargar recurso'
  },
  {
    iconLabel: 'far fa-file-pdf',
    title: 'Nulla facilisi dignissim',
    subtitle: '• Nivel • Grado • Materia',
    type: TYPES_MULTIMEDIA.document,
    sections: [
      {
        title: 'Propósito',
        subtitle: 'Facilisi etiam dignissim diam quis. Sed sed risus pretium quam vulputate dignissim suspendisse',
      },
      {
        title: 'Campo de formación',
        subtitle: 'Nulla facilisi morbi tempus iaculis urna',
      },
    ],
    url: 'https://www.orimi.com/pdf-test.pdf',
    showButtonDownload: false,
    labelButtonDownload: 'Descargar recurso'
  },
  {
    iconLabel: 'far fa-film',
    title: 'Nulla facilisi dignissim',
    subtitle: '• Nivel • Grado • Materia',
    type: TYPES_MULTIMEDIA.video,
    sections: [
      {
        title: 'Propósito',
        subtitle: 'Facilisi etiam dignissim diam quis. Sed sed risus pretium quam vulputate dignissim suspendisse',
      },
      {
        title: 'Campo de formación',
        subtitle: 'Nulla facilisi morbi tempus iaculis urna',
      },
    ],
    url: 'https://www.orimi.com/pdf-test.pdf',
    showButtonDownload: false,
    labelButtonDownload: 'Descargar recurso'
  },
];