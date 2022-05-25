import './styles/property.css';

import { ElementType, ComponentType } from '../../data';
import { useState } from 'react';

function GetComponent({
  type,
  disable,
}: {
  type: ComponentType;
  disable?: Array<string>;
}) {
  const [inputFocused, setInputFocused] = useState<number>();

  return (
    <div
      className="component"
      style={{
        height: type === ComponentType.POSITION ? 150 : 100,
      }}
    >
      <p className="title">{type}</p>
      {type === ComponentType.POSITION ? (
        <div>
          <div
            style={{
              width: 130,
              height: 30,
              backgroundColor:
                inputFocused === 0 ? 'var(--panelPathColor)' : undefined,
              borderRadius: 6,
              float: 'left',
            }}
          >
            <p
              style={{
                position: 'relative',
                top: '50%',
                transform: 'translateY(-50%)',
                marginLeft: 10,
                color: 'var(--shortcutIconColor)',
                fontSize: '.85rem',
                float: 'left',
              }}
            >
              X
            </p>
            <input
              type="text"
              style={{
                width: 'calc(100% - 40px)',
                height: '100%',
                padding: 0,
                marginRight: 10,
                borderRadius: 0,
                fontSize: '.9rem',
                border: 'none',
                backgroundColor: '#00000000',
                float: 'right',
                color: 'var(--fieldTextColor)',
              }}
              defaultValue={0}
              onFocus={() => {
                setInputFocused(0);
              }}
              onBlur={() => {
                setInputFocused(undefined);
              }}
              onChange={(e) => {}}
            />
          </div>
          <div
            style={{
              width: 130,
              height: 30,
              backgroundColor:
                inputFocused === 1 ? 'var(--panelPathColor)' : undefined,
              borderRadius: 6,
              float: 'left',
              marginLeft: 10,
            }}
          >
            <p
              style={{
                position: 'relative',
                top: '50%',
                transform: 'translateY(-50%)',
                marginLeft: 10,
                color: 'var(--shortcutIconColor)',
                fontSize: '.85rem',
                float: 'left',
              }}
            >
              Y
            </p>
            <input
              type="text"
              style={{
                width: 'calc(100% - 40px)',
                height: '100%',
                padding: 0,
                marginRight: 10,
                borderRadius: 0,
                fontSize: '.9rem',
                border: 'none',
                backgroundColor: '#00000000',
                float: 'right',
                color: 'var(--fieldTextColor)',
              }}
              defaultValue={0}
              onFocus={() => {
                setInputFocused(1);
              }}
              onBlur={() => {
                setInputFocused(undefined);
              }}
              onChange={(e) => {}}
            />
          </div>
        </div>
      ) : undefined}
    </div>
  );
}

export default function Property({ type }: { type: ElementType }) {
  return (
    <div className="Property">
      {
        {
          text: (
            <div>
              <GetComponent type={ComponentType.POSITION} />
              <GetComponent type={ComponentType.SIZE} />
            </div>
          ),
          line: undefined,
          image: undefined,
          video: undefined,
          button: undefined,
          toggle: undefined,
          'sl-input': undefined,
          'ml-input': undefined,
        }[type]
      }
    </div>
  );
}
