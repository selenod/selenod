import { NodesData } from '@ieum-lang/ieum';

export enum ElementType {
  TEXT = 'text',
  LINE = 'line',
  IMAGE = 'image',
  VIDEO = 'video',
  BUTTON = 'button',
  CHECKBOX = 'checkbox',
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
  BORDER = 'Border',
  TEXT = 'Text',
  LINE = 'Line',
  IMAGE = 'Image',
  VIDEO = 'Video',
  BUTTON = 'Button',
  CHECKBOX = 'Checkbox',
}

export enum Part {
  HORIZONTAL = 'Horizontal',
  VERTICAL = 'Vertical',
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

export interface ResponseProps {
  status?: string;
  message?: string;
}

const eventNodeData: NodesData = {
  'selenod.event.onLoad': {
    name: 'On Load',
    inputs: [
      {
        name: 'do',
        type: {
          type: 'func',
        },
      },
    ],
    outputs: [],
  },
};

const consoleNodeData: NodesData = {
  'selenod.console.log': {
    name: 'Console Log',
    inputs: [
      {
        name: 'message',
        type: {
          type: 'any',
        },
        defaultValue: '',
      },
    ],
    outputs: [],
  },
};

export const nodeData: NodesData = {
  ...eventNodeData,
  ...consoleNodeData,
};
