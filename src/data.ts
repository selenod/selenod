import { NodesData } from '@ieum-lang/ieum';
import IEUM_listNode from '@ieum-lang/ieum/dist/data/defaultNodes/listNodes';
import IEUM_dictNode from '@ieum-lang/ieum/dist/data/defaultNodes/dictNodes';
import IEUM_mathNode from '@ieum-lang/ieum/dist/data/defaultNodes/mathNodes';

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

// NodeData Field
const eventNodeData: NodesData = {
  'selenod.event.onLoad': {
    name: 'On Load',
    inputs: [
      {
        name: 'execute',
        type: {
          type: 'func',
        },
      },
    ],
    outputs: [],
  },
  'selenod.event.onClick': {
    name: 'On Click',
    inputs: [
      {
        name: 'target',
        type: {
          type: 'enum',
        },
      },
      {
        name: 'execute',
        type: {
          type: 'func',
        },
      },
    ],
    outputs: [],
  },
};

const stringNodeData: NodesData = {
  'selenod.string.constructor': {
    name: 'String',
    inputs: [
      {
        name: 'value',
        type: {
          type: 'string',
        },
      },
    ],
    outputs: [
      {
        name: 'return',
        type: {
          type: 'string',
        },
      },
    ],
  },
  'selenod.string.concatenate': {
    name: 'Concatenate',
    inputs: [
      {
        name: 'value1',
        type: {
          type: 'string',
        },
      },
      {
        name: 'value2',
        type: {
          type: 'string',
        },
      },
    ],
    outputs: [
      {
        name: 'return',
        type: {
          type: 'string',
        },
      },
    ],
  },
};

const intNodeData: NodesData = {
  'selenod.int.constructor': {
    name: 'Int',
    inputs: [
      {
        name: 'value',
        type: {
          type: 'int',
        },
      },
    ],
    outputs: [
      {
        name: 'return',
        type: {
          type: 'int',
        },
      },
    ],
  },
  'selenod.int.intToFloat': {
    name: 'Int to Float',
    inputs: [
      {
        name: 'value',
        type: {
          type: 'int',
        },
      },
    ],
    outputs: [
      {
        name: 'return',
        type: {
          type: 'float',
        },
      },
    ],
  },
};

const floatNodeData: NodesData = {
  'selenod.float.constructor': {
    name: 'Float',
    inputs: [
      {
        name: 'value',
        type: {
          type: 'float',
        },
      },
    ],
    outputs: [
      {
        name: 'return',
        type: {
          type: 'float',
        },
      },
    ],
  },
  'selenod.float.floatToInt': {
    name: 'Float to Int',
    inputs: [
      {
        name: 'value',
        type: {
          type: 'float',
        },
      },
    ],
    outputs: [
      {
        name: 'return',
        type: {
          type: 'int',
        },
      },
    ],
  },
};

const boolNodeData: NodesData = {
  'selenod.bool.constructor': {
    name: 'Bool',
    inputs: [
      {
        name: 'value',
        type: {
          type: 'bool',
        },
      },
    ],
    outputs: [
      {
        name: 'return',
        type: {
          type: 'bool',
        },
      },
    ],
  },
};

const variableNodeData: NodesData = {
  'selenod.variable.setVariable': {
    name: 'Set Variable',
    inputs: [
      {
        name: 'name',
        type: {
          type: 'string',
        },
      },
      {
        name: 'value',
        type: {
          type: 'any',
        },
      },
    ],
    outputs: [],
  },
  'selenod.variable.getVariable': {
    name: 'Get Variable',
    inputs: [
      {
        name: 'name',
        type: {
          type: 'string',
        },
      },
    ],
    outputs: [
      {
        name: 'return',
        type: {
          type: 'any',
        },
      },
    ],
  },
};

const debugNodeData: NodesData = {
  'selenod.debug.print': {
    name: 'Print',
    inputs: [
      {
        name: 'message',
        type: {
          type: 'any',
        },
      },
    ],
    outputs: [],
  },
  'selenod.debug.alert': {
    name: 'Alert',
    inputs: [
      {
        name: 'message',
        type: {
          type: 'any',
        },
      },
    ],
    outputs: [],
  },
};

const statementNodeData: NodesData = {
  'selenod.statement.branch': {
    name: 'Branch',
    inputs: [
      {
        name: 'condition',
        type: {
          type: 'bool',
        },
      },
      {
        name: 'true',
        type: {
          type: 'nullable',
          metadata: {
            T: {
              type: 'func',
            },
          },
        },
      },
      {
        name: 'false',
        type: {
          type: 'nullable',
          metadata: {
            T: {
              type: 'func',
            },
          },
        },
      },
    ],
    outputs: [],
  },
  'selenod.statement.if': {
    name: 'If',
    inputs: [
      {
        name: 'condition',
        type: {
          type: 'bool',
        },
      },
      {
        name: 'true',
        type: {
          type: 'any',
        },
      },
      {
        name: 'false',
        type: {
          type: 'any',
        },
      },
    ],
    outputs: [
      {
        name: 'return',
        type: {
          type: 'any',
        },
      },
    ],
  },
  'selenod.statement.while': {
    name: 'While',
    inputs: [
      {
        name: 'condition',
        type: {
          type: 'func',
          metadata: {
            inputs: [],
            outputs: [{ name: 'return', type: { type: 'bool' } }],
          },
        },
      },
      {
        name: 'execute',
        type: {
          type: 'func',
        },
      },
    ],
    outputs: [],
  },
  'selenod.statement.repeat': {
    name: 'Repeat',
    inputs: [
      {
        name: 'count',
        type: {
          type: 'int',
        },
      },
      {
        name: 'execute',
        type: {
          type: 'func',
        },
      },
    ],
    outputs: [],
  },
  'selenod.statement.sleep': {
    name: 'Sleep',
    inputs: [
      {
        name: 'delay',
        type: {
          type: 'float',
        },
      },
      {
        name: 'execute',
        type: {
          type: 'func',
        },
      },
    ],
    outputs: [],
  },
};

// Export Field
export const nodeData: NodesData = {
  ...eventNodeData,
  ...stringNodeData,
  ...intNodeData,
  ...floatNodeData,
  ...boolNodeData,
  ...IEUM_listNode,
  ...IEUM_dictNode,
  ...statementNodeData,
  ...variableNodeData,
  ...debugNodeData,
  ...IEUM_mathNode,
};
