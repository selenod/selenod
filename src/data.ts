export enum ElementType {
  TEXT = 'text',
  LINE = 'line',
  IMAGE = 'image',
  VIDEO = 'video',
  BUTTON = 'button',
  TOGGLE = 'toggle',
  SLINPUT = 'sl-input',
  MLINPUT = 'ml-input',
}

export enum ContentType {
  DEFAULT = 'default',
  DANGER = 'danger',
  LINE = 'line',
  CATEGORY = 'category',
}

export enum AssetType {
  FILE = 'file',
  FOLDER = 'folder',
}

export enum ComponentType {
  POSITION = 'Position',
  SIZE = 'Size',
  TEXT = 'Text',
}

export const imageExtensions: Array<string> = [
  'png',
  'jpg',
  'jpeg',
  'bmp',
  'gif',
  'tiff',
  'raw',
];

export const videoExtensions: Array<string> = ['mp4', 'mov'];
