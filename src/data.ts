import { NodesData } from '@ieum-lang/ieum';
import IEUM_listNode from '@ieum-lang/ieum/dist/data/defaultNodes/listNodes';
import IEUM_dictNode from '@ieum-lang/ieum/dist/data/defaultNodes/dictNodes';
import IEUM_mathNode from '@ieum-lang/ieum/dist/data/defaultNodes/mathNodes';
import IEUM_functionNode from '@ieum-lang/ieum/dist/data/defaultNodes/functionNodes';
import IEUM_statementNode from '@ieum-lang/ieum/dist/data/defaultNodes/statementNodes';
import IEUM_logicNode from '@ieum-lang/ieum/dist/data/defaultNodes/logicNodes';
import IEUM_varNode from '@ieum-lang/ieum/dist/data/defaultNodes/variableNodes';
import IEUM_boolNode from '@ieum-lang/ieum/dist/data/defaultNodes/boolNodes';
import IEUM_floatNode from '@ieum-lang/ieum/dist/data/defaultNodes/floatNodoes';
import IEUM_intNode from '@ieum-lang/ieum/dist/data/defaultNodes/intNodoes';
import IEUM_nullableNode from '@ieum-lang/ieum/dist/data/defaultNodes/nullableNodes';
import IEUM_stringNode from '@ieum-lang/ieum/dist/data/defaultNodes/stringNodoes';

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
        name: 'element',
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
  'selenod.event.onChange': {
    name: 'On Change',
    inputs: [
      {
        name: 'element',
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

const utilitiesNodeData: NodesData = {
  'selenod.utilities.sleep': {
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
  'selenod.utilities.redirectPage': {
    name: 'Redirect Page',
    inputs: [
      {
        name: 'name',
        type: {
          type: 'string',
        },
      },
      {
        name: 'new Tab',
        type: {
          type: 'bool',
        },
      },
    ],
    outputs: [],
  },
  'selenod.utilities.redirectUrl': {
    name: 'Redirect URL',
    inputs: [
      {
        name: 'URL',
        type: {
          type: 'string',
        },
      },
      {
        name: 'new Tab',
        type: {
          type: 'bool',
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
  'selenod.element.get:getByName': {
    name: 'Get Element by Name',
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
        name: 'text Value',
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
  'selenod.element.get:getById': {
    name: 'Get Element by Id',
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
        name: 'text Value',
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
  'selenod.element.set:name': {
    name: 'Set Name',
    inputs: [
      {
        name: 'element',
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
  'selenod.element.set:pos': {
    name: 'Set Position',
    inputs: [
      {
        name: 'element',
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
  'selenod.element.set:align': {
    name: 'Set Align',
    inputs: [
      {
        name: 'element',
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
  'selenod.element.set:rotation': {
    name: 'Set Rotation',
    inputs: [
      {
        name: 'element',
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
  'selenod.element.set:index': {
    name: 'Set Index Order',
    inputs: [
      {
        name: 'element',
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
  'selenod.element.set:show': {
    name: 'Set Show',
    inputs: [
      {
        name: 'element',
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
  'selenod.element.set:size': {
    name: 'Set Size',
    inputs: [
      {
        name: 'element',
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
  'selenod.element.set:text': {
    name: 'Set Text',
    inputs: [
      {
        name: 'element',
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
  'selenod.element.set:textValue': {
    name: 'Set Text Value',
    inputs: [
      {
        name: 'element',
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
  'selenod.element.set:fontSize': {
    name: 'Set Font Size',
    inputs: [
      {
        name: 'element',
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
  'selenod.element.set:fontWeight': {
    name: 'Set Font Weight',
    inputs: [
      {
        name: 'element',
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
  'selenod.element.set:color': {
    name: 'Set Color',
    inputs: [
      {
        name: 'element',
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
  'selenod.element.set:backgroundColor': {
    name: 'Set Background Color',
    inputs: [
      {
        name: 'element',
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
  'selenod.element.set:borderRadius': {
    name: 'Set Border Radius',
    inputs: [
      {
        name: 'element',
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
  'selenod.element.set:borderColor': {
    name: 'Set Border Color',
    inputs: [
      {
        name: 'element',
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
  'selenod.element.set:checked': {
    name: 'Set Checked',
    inputs: [
      {
        name: 'element',
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
  'selenod.element.set:asset': {
    name: 'Set Asset',
    inputs: [
      {
        name: 'element',
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
  'selenod.element.del:deleteByName': {
    name: 'Delete Element by Name',
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
  'selenod.element.del:deleteById': {
    name: 'Delete Element by Id',
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
};

const assetNode: NodesData = {
  'selenod.asset.get:getByName': {
    name: 'Get Asset by Name',
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
        name: 'contents',
        type: {
          type: 'string',
        },
      },
    ],
  },
  'selenod.asset.get:getById': {
    name: 'Get Asset by Id',
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
        name: 'contents',
        type: {
          type: 'string',
        },
      },
    ],
  },
};

const fetchNode: NodesData = {
  'selenod.fetch.get': {
    name: 'Get',
    inputs: [
      {
        name: 'url',
        type: {
          type: 'string',
        },
      },
      {
        name: 'headers',
        type: {
          type: 'dict',
          metadata: {
            generics: ['T'],
            genericValues: {
              T: {
                type: 'string',
                metadata: {
                  inputs: [],
                  outputs: [],
                },
              },
            },
          },
        },
      },
      {
        name: 'then',
        type: {
          type: 'func',
          metadata: {
            inputs: [
              {
                name: 'response',
                type: {
                  type: 'dict',
                },
              },
              {
                name: 'data',
                type: {
                  type: 'any',
                },
              },
            ],
            outputs: [],
          },
        },
      },
      {
        name: 'catch',
        type: {
          type: 'func',
          metadata: {
            inputs: [
              {
                name: 'response',
                type: {
                  type: 'dict',
                },
              },
              {
                name: 'error',
                type: {
                  type: 'any',
                },
              },
            ],
            outputs: [],
          },
        },
      },
    ],
    outputs: [],
  },
  'selenod.fetch.post': {
    name: 'Post',
    inputs: [
      {
        name: 'url',
        type: {
          type: 'string',
        },
      },
      {
        name: 'headers',
        type: {
          type: 'dict',
          metadata: {
            generics: ['T'],
            genericValues: {
              T: {
                type: 'string',
              },
            },
          },
        },
      },
      {
        name: 'body',
        type: {
          type: 'dict',
          metadata: {
            generics: ['T'],
            genericValues: {
              T: {
                type: 'any',
                metadata: {
                  inputs: [],
                  outputs: [],
                },
              },
            },
          },
        },
      },
      {
        name: 'then',
        type: {
          type: 'func',
          metadata: {
            inputs: [
              {
                name: 'response',
                type: {
                  type: 'dict',
                },
              },
              {
                name: 'data',
                type: {
                  type: 'any',
                },
              },
            ],
            outputs: [],
          },
        },
      },
      {
        name: 'catch',
        type: {
          type: 'func',
          metadata: {
            inputs: [
              {
                name: 'response',
                type: {
                  type: 'dict',
                },
              },
              {
                name: 'error',
                type: {
                  type: 'any',
                },
              },
            ],
            outputs: [],
          },
        },
      },
    ],
    outputs: [],
  },
  'selenod.fetch.put': {
    name: 'Put',
    inputs: [
      {
        name: 'url',
        type: {
          type: 'string',
        },
      },
      {
        name: 'headers',
        type: {
          type: 'dict',
          metadata: {
            generics: ['T'],
            genericValues: {
              T: {
                type: 'string',
              },
            },
          },
        },
      },
      {
        name: 'body',
        type: {
          type: 'dict',
          metadata: {
            generics: ['T'],
            genericValues: {
              T: {
                type: 'any',
                metadata: {
                  inputs: [],
                  outputs: [],
                },
              },
            },
          },
        },
      },
      {
        name: 'then',
        type: {
          type: 'func',
          metadata: {
            inputs: [
              {
                name: 'response',
                type: {
                  type: 'dict',
                },
              },
              {
                name: 'data',
                type: {
                  type: 'any',
                },
              },
            ],
            outputs: [],
          },
        },
      },
      {
        name: 'catch',
        type: {
          type: 'func',
          metadata: {
            inputs: [
              {
                name: 'response',
                type: {
                  type: 'dict',
                },
              },
              {
                name: 'error',
                type: {
                  type: 'any',
                },
              },
            ],
            outputs: [],
          },
        },
      },
    ],
    outputs: [],
  },
  'selenod.fetch.delete': {
    name: 'Delete',
    inputs: [
      {
        name: 'url',
        type: {
          type: 'string',
        },
      },
      {
        name: 'then',
        type: {
          type: 'func',
          metadata: {
            inputs: [
              {
                name: 'response',
                type: {
                  type: 'dict',
                },
              },
              {
                name: 'data',
                type: {
                  type: 'any',
                },
              },
            ],
            outputs: [],
          },
        },
      },
      {
        name: 'catch',
        type: {
          type: 'func',
          metadata: {
            inputs: [
              {
                name: 'response',
                type: {
                  type: 'dict',
                },
              },
              {
                name: 'error',
                type: {
                  type: 'any',
                },
              },
            ],
            outputs: [],
          },
        },
      },
    ],
    outputs: [],
  },
};

// Export Field
export const nodeData: NodesData = {
  ...eventNodeData,
  ...elementNodeData,
  ...assetNode,
  ...debugNodeData,
  ...fetchNode,
  ...utilitiesNodeData,
  ...IEUM_stringNode,
  ...IEUM_intNode,
  ...IEUM_floatNode,
  ...IEUM_boolNode,
  ...IEUM_nullableNode,
  ...IEUM_listNode,
  ...IEUM_dictNode,
  ...IEUM_statementNode,
  ...IEUM_logicNode,
  ...IEUM_mathNode,
  ...IEUM_functionNode,
  ...IEUM_varNode,
};
