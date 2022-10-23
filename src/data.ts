import { NodesData } from '@ieum-lang/ieum';
import IEUM_listNode from '@ieum-lang/ieum/dist/data/defaultNodes/listNodes';
import IEUM_dictNode from '@ieum-lang/ieum/dist/data/defaultNodes/dictNodes';
import IEUM_mathNode from '@ieum-lang/ieum/dist/data/defaultNodes/mathNodes';
import IEUM_functionNode from '@ieum-lang/ieum/dist/data/defaultNodes/functionNodes';
import IEUM_variableNode from '@ieum-lang/ieum/dist/data/defaultNodes/variableNodes';
import IEUM_logicNode from '@ieum-lang/ieum/dist/data/defaultNodes/logicNodes';

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
          type: 'string',
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
  'selenod.event.onUpdate': {
    name: 'On Update',
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
  'selenod.string.toString': {
    name: 'To String',
    inputs: [
      {
        name: 'value',
        type: {
          type: 'any',
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
  'selenod.int.toInt': {
    name: 'To Int',
    inputs: [
      {
        name: 'value',
        type: {
          type: 'any',
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
  'selenod.float.toFloat': {
    name: 'To Float',
    inputs: [
      {
        name: 'value',
        type: {
          type: 'any',
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
  'selenod.debug.try': {
    name: 'Try',
    inputs: [
      {
        name: 'execute',
        type: {
          type: 'func',
        },
      },
      {
        name: 'catch',
        type: {
          type: 'func',
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

const elementNodeData: NodesData = {
  'selenod.element.create': {
    name: 'Create Element',
    inputs: [
      {
        name: 'name',
        type: {
          type: 'string',
        },
      },
      {
        name: 'type',
        type: {
          type: 'elementType',
        },
      },
      {
        name: 'is Shown',
        type: {
          type: 'bool',
        },
      },
    ],
    outputs: [
      {
        name: 'id',
        type: {
          type: 'int',
        },
      },
    ],
  },
  'selenod.element.getByName': {
    name: 'Get Element By Name',
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
        name: 'name',
        type: {
          type: 'string',
        },
      },
      {
        name: 'id',
        type: {
          type: 'int',
        },
      },
      {
        name: 'x',
        type: {
          type: 'string',
        },
      },
      {
        name: 'y',
        type: {
          type: 'string',
        },
      },
      {
        name: 'x Align',
        type: {
          type: 'float',
        },
      },
      {
        name: 'y Align',
        type: {
          type: 'float',
        },
      },
      {
        name: 'rotation',
        type: {
          type: 'string',
        },
      },
      {
        name: 'index',
        type: {
          type: 'int',
        },
      },
      {
        name: 'is Shown',
        type: {
          type: 'bool',
        },
      },
      {
        name: 'width',
        type: {
          type: 'string',
        },
      },
      {
        name: 'height',
        type: {
          type: 'string',
        },
      },
      {
        name: 'text',
        type: {
          type: 'string',
        },
      },
      {
        name: 'font Size',
        type: {
          type: 'float',
        },
      },
      {
        name: 'font Weight',
        type: {
          type: 'int',
        },
      },
      {
        name: 'color',
        type: {
          type: 'string',
        },
      },
      {
        name: 'background Color',
        type: {
          type: 'string',
        },
      },
      {
        name: 'border Radius',
        type: {
          type: 'string',
        },
      },
      {
        name: 'border Color',
        type: {
          type: 'string',
        },
      },
      {
        name: 'is Checked',
        type: {
          type: 'bool',
        },
      },
      {
        name: 'asset Id',
        type: {
          type: 'int',
        },
      },
    ],
  },
  'selenod.element.getById': {
    name: 'Get Element By Id',
    inputs: [
      {
        name: 'id',
        type: {
          type: 'int',
        },
      },
    ],
    outputs: [
      {
        name: 'name',
        type: {
          type: 'string',
        },
      },
      {
        name: 'id',
        type: {
          type: 'int',
        },
      },
      {
        name: 'x',
        type: {
          type: 'string',
        },
      },
      {
        name: 'y',
        type: {
          type: 'string',
        },
      },
      {
        name: 'x Align',
        type: {
          type: 'float',
        },
      },
      {
        name: 'y Align',
        type: {
          type: 'float',
        },
      },
      {
        name: 'rotation',
        type: {
          type: 'string',
        },
      },
      {
        name: 'index',
        type: {
          type: 'int',
        },
      },
      {
        name: 'is Shown',
        type: {
          type: 'bool',
        },
      },
      {
        name: 'width',
        type: {
          type: 'string',
        },
      },
      {
        name: 'height',
        type: {
          type: 'string',
        },
      },
      {
        name: 'text',
        type: {
          type: 'string',
        },
      },
      {
        name: 'font Size',
        type: {
          type: 'float',
        },
      },
      {
        name: 'font Weight',
        type: {
          type: 'int',
        },
      },
      {
        name: 'color',
        type: {
          type: 'string',
        },
      },
      {
        name: 'background Color',
        type: {
          type: 'string',
        },
      },
      {
        name: 'border Radius',
        type: {
          type: 'string',
        },
      },
      {
        name: 'border Color',
        type: {
          type: 'string',
        },
      },
      {
        name: 'is Checked',
        type: {
          type: 'bool',
        },
      },
      {
        name: 'asset Id',
        type: {
          type: 'int',
        },
      },
    ],
  },
  'selenod.element.getList': {
    name: 'Get Element List',
    inputs: [],
    outputs: [
      {
        name: 'name List',
        type: {
          type: 'list',
          metadata: {
            generics: ['T'],
            genericValues: { T: { type: 'string' } },
          },
        },
      },
    ],
  },
  'selenod.element.deleteByName': {
    name: 'Delete Element By Name',
    inputs: [
      {
        name: 'name',
        type: {
          type: 'string',
        },
      },
    ],
    outputs: [],
  },
  'selenod.element.deleteById': {
    name: 'Delete Element By Id',
    inputs: [
      {
        name: 'id',
        type: {
          type: 'int',
        },
      },
    ],
    outputs: [],
  },
  'selenod.element.rename': {
    name: 'Rename Element',
    inputs: [
      {
        name: 'target',
        type: {
          type: 'string',
        },
      },
      {
        name: 'name',
        type: {
          type: 'string',
        },
      },
    ],
    outputs: [],
  },
  'selenod.element.setPos': {
    name: 'Set Position',
    inputs: [
      {
        name: 'target',
        type: {
          type: 'string',
        },
      },
      {
        name: 'x',
        type: {
          type: 'string',
        },
      },
      {
        name: 'y',
        type: {
          type: 'string',
        },
      },
    ],
    outputs: [],
  },
  'selenod.element.setAlign': {
    name: 'Set Align',
    inputs: [
      {
        name: 'target',
        type: {
          type: 'string',
        },
      },
      {
        name: 'x Align',
        type: {
          type: 'float',
        },
      },
      {
        name: 'y Align',
        type: {
          type: 'float',
        },
      },
    ],
    outputs: [],
  },
  'selenod.element.setRotation': {
    name: 'Set Rotation',
    inputs: [
      {
        name: 'target',
        type: {
          type: 'string',
        },
      },
      {
        name: 'rotation',
        type: {
          type: 'string',
        },
      },
    ],
    outputs: [],
  },
  'selenod.element.setIndex': {
    name: 'Set Index Order',
    inputs: [
      {
        name: 'target',
        type: {
          type: 'string',
        },
      },
      {
        name: 'order',
        type: {
          type: 'int',
        },
      },
    ],
    outputs: [],
  },
  'selenod.element.setShow': {
    name: 'Set Show',
    inputs: [
      {
        name: 'target',
        type: {
          type: 'string',
        },
      },
      {
        name: 'is Shown',
        type: {
          type: 'bool',
        },
      },
    ],
    outputs: [],
  },
  'selenod.element.setSize': {
    name: 'Set Size',
    inputs: [
      {
        name: 'target',
        type: {
          type: 'string',
        },
      },
      {
        name: 'width',
        type: {
          type: 'string',
        },
      },
      {
        name: 'height',
        type: {
          type: 'string',
        },
      },
    ],
    outputs: [],
  },
  'selenod.element.setText': {
    name: 'Set Text',
    inputs: [
      {
        name: 'target',
        type: {
          type: 'string',
        },
      },
      {
        name: 'text',
        type: {
          type: 'string',
        },
      },
    ],
    outputs: [],
  },
  'selenod.element.setFontSize': {
    name: 'Set Font Size',
    inputs: [
      {
        name: 'target',
        type: {
          type: 'string',
        },
      },
      {
        name: 'size',
        type: {
          type: 'float',
        },
      },
    ],
    outputs: [],
  },
  'selenod.element.setFontWeight': {
    name: 'Set Font Weight',
    inputs: [
      {
        name: 'target',
        type: {
          type: 'string',
        },
      },
      {
        name: 'weight',
        type: {
          type: 'int',
        },
      },
    ],
    outputs: [],
  },
  'selenod.element.setColor': {
    name: 'Set Color',
    inputs: [
      {
        name: 'target',
        type: {
          type: 'string',
        },
      },
      {
        name: 'color',
        type: {
          type: 'string',
        },
      },
    ],
    outputs: [],
  },
  'selenod.element.setBackgroundColor': {
    name: 'Set Background Color',
    inputs: [
      {
        name: 'target',
        type: {
          type: 'string',
        },
      },
      {
        name: 'color',
        type: {
          type: 'string',
        },
      },
    ],
    outputs: [],
  },
  'selenod.element.setBorderRadius': {
    name: 'Set Border Radius',
    inputs: [
      {
        name: 'target',
        type: {
          type: 'string',
        },
      },
      {
        name: 'radius',
        type: {
          type: 'string',
        },
      },
    ],
    outputs: [],
  },
  'selenod.element.setBorderColor': {
    name: 'Set Border Color',
    inputs: [
      {
        name: 'target',
        type: {
          type: 'string',
        },
      },
      {
        name: 'color',
        type: {
          type: 'string',
        },
      },
    ],
    outputs: [],
  },
  'selenod.element.setChecked': {
    name: 'Set Checked',
    inputs: [
      {
        name: 'target',
        type: {
          type: 'string',
        },
      },
      {
        name: 'is Checked',
        type: {
          type: 'bool',
        },
      },
    ],
    outputs: [],
  },
  'selenod.element.setAsset': {
    name: 'Set Asset',
    inputs: [
      {
        name: 'target',
        type: {
          type: 'string',
        },
      },
      {
        name: 'asset Id',
        type: {
          type: 'int',
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
  ...IEUM_variableNode,
  ...IEUM_functionNode,
  ...IEUM_logicNode,
  ...elementNodeData,
  ...debugNodeData,
  ...IEUM_mathNode,
};
