import './styles/property.css';

import { ElementType, ComponentType } from '../../data';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { editElementProp } from './reduxSlice/windowSlice';

function GetComponent({
  current,
  type,
}: {
  current: number;
  type: ComponentType;
  disable?: Array<string>;
}) {
  const windowList = useSelector((state: RootState) => state.window.windowList);
  const currentWindow = useSelector(
    (state: RootState) => state.window.currentWindow
  );
  const currentElement = useSelector(
    (state: RootState) => state.window.currentElement
  );

  const [inputFocused, setInputFocused] = useState<number>();
  const [textAreaHeight, setTextAreaHeight] = useState<number | undefined>(
    type === ComponentType.TEXT
      ? windowList
          .find((window) => window.id === currentWindow)!
          .elementData.find((element) => element.id === current)!
          .text!.split('\n').length - 1
      : undefined
  );

  const dispatch = useDispatch();

  return (
    <div
      className="component"
      style={{
        height: 'auto',
      }}
    >
      <p className="title">{type}</p>
      {
        {
          Position: (
            <div>
              <div
                style={{
                  width: '100%',
                  height: 30,
                }}
              >
                <div
                  style={{
                    width: 'calc(50% - 5px)',
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
                      width: 'calc(100% - 36px)',
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
                    value={
                      windowList
                        .find((window) => window.id === currentWindow)!
                        .elementData.find((element) => element.id === current)!
                        .x
                    }
                    onFocus={() => {
                      setInputFocused(0);
                    }}
                    onBlur={() => {
                      if (
                        windowList
                          .find((window) => window.id === currentWindow)!
                          .elementData.find(
                            (element) => element.id === current
                          )!.x === ''
                      ) {
                        dispatch(
                          editElementProp({
                            id: currentElement!,
                            x: '0',
                          })
                        );
                      }
                      setInputFocused(undefined);
                    }}
                    onChange={(e) => {
                      dispatch(
                        editElementProp({
                          id: currentElement!,
                          x: e.target.value === '' ? '' : e.target.value!,
                        })
                      );
                    }}
                  />
                </div>
                <div
                  style={{
                    width: 'calc(50% - 5px)',
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
                      width: 'calc(100% - 36px)',
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
                    value={
                      windowList
                        .find((window) => window.id === currentWindow)!
                        .elementData.find((element) => element.id === current)!
                        .y
                    }
                    onFocus={() => {
                      setInputFocused(1);
                    }}
                    onBlur={() => {
                      if (
                        windowList
                          .find((window) => window.id === currentWindow)!
                          .elementData.find(
                            (element) => element.id === current
                          )!.y === ''
                      ) {
                        dispatch(
                          editElementProp({
                            id: currentElement!,
                            y: '0',
                          })
                        );
                      }
                      setInputFocused(undefined);
                    }}
                    onChange={(e) => {
                      dispatch(
                        editElementProp({
                          id: currentElement!,
                          y: e.target.value === '' ? '' : e.target.value!,
                        })
                      );
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  width: '100%',
                  height: 30,
                  marginTop: 5,
                }}
              >
                <div
                  style={{
                    width: 'calc(50% - 5px)',
                    height: 30,
                    backgroundColor:
                      inputFocused === 2 ? 'var(--panelPathColor)' : undefined,
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
                    X Align
                  </p>
                  <input
                    type="text"
                    style={{
                      width: 'calc(100% - 70px)',
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
                    value={
                      windowList
                        .find((window) => window.id === currentWindow)!
                        .elementData.find((element) => element.id === current)!
                        .xAlign + '%'
                    }
                    onFocus={() => {
                      setInputFocused(2);
                    }}
                    onBlur={() => {
                      setInputFocused(undefined);
                    }}
                    onChange={(e) => {
                      if (
                        !isNaN(parseFloat(e.target.value.replace('%', '')!)) ||
                        e.target.value.replace('%', '') === ''
                      ) {
                        dispatch(
                          editElementProp({
                            id: currentElement!,
                            xAlign:
                              e.target.value === '%'
                                ? 0
                                : parseFloat(e.target.value.replace('%', '')!) <
                                  100
                                ? parseFloat(e.target.value.replace('%', '')!)
                                : 100,
                          })
                        );
                      }
                    }}
                  />
                </div>
                <div
                  style={{
                    width: 'calc(50% - 5px)',
                    height: 30,
                    backgroundColor:
                      inputFocused === 3 ? 'var(--panelPathColor)' : undefined,
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
                    Y Align
                  </p>
                  <input
                    type="text"
                    style={{
                      width: 'calc(100% - 70px)',
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
                    value={
                      windowList
                        .find((window) => window.id === currentWindow)!
                        .elementData.find((element) => element.id === current)!
                        .yAlign + '%'
                    }
                    onFocus={() => {
                      setInputFocused(3);
                    }}
                    onBlur={() => {
                      setInputFocused(undefined);
                    }}
                    onChange={(e) => {
                      if (
                        !isNaN(parseFloat(e.target.value.replace('%', '')!)) ||
                        e.target.value.replace('%', '') === ''
                      ) {
                        dispatch(
                          editElementProp({
                            id: currentElement!,
                            yAlign:
                              e.target.value === '%'
                                ? 0
                                : parseFloat(e.target.value.replace('%', '')!) <
                                  100
                                ? parseFloat(e.target.value.replace('%', '')!)
                                : 100,
                          })
                        );
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          ),
          Size: (
            <div
              style={{
                display: 'flex',
              }}
            >
              <div
                style={{
                  width: 'calc(50% - 5px)',
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
                  W
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
                  value={
                    windowList
                      .find((window) => window.id === currentWindow)!
                      .elementData.find((element) => element.id === current)!
                      .width
                  }
                  onFocus={() => {
                    setInputFocused(0);
                  }}
                  onBlur={() => {
                    if (
                      windowList
                        .find((window) => window.id === currentWindow)!
                        .elementData.find((element) => element.id === current)!
                        .width === ''
                    ) {
                      dispatch(
                        editElementProp({
                          id: currentElement!,
                          width: '0',
                        })
                      );
                    }
                    setInputFocused(undefined);
                  }}
                  onChange={(e) => {
                    dispatch(
                      editElementProp({
                        id: currentElement!,
                        width: e.target.value === '' ? '' : e.target.value!,
                      })
                    );
                  }}
                />
              </div>
              <div
                style={{
                  width: 'calc(50% - 5px)',
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
                  H
                </p>
                <input
                  type="text"
                  style={{
                    width: 'calc(100% - 37px)',
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
                  value={
                    windowList
                      .find((window) => window.id === currentWindow)!
                      .elementData.find((element) => element.id === current)!
                      .height
                  }
                  onFocus={() => {
                    setInputFocused(1);
                  }}
                  onBlur={() => {
                    if (
                      windowList
                        .find((window) => window.id === currentWindow)!
                        .elementData.find((element) => element.id === current)!
                        .height === ''
                    ) {
                      dispatch(
                        editElementProp({
                          id: currentElement!,
                          height: '0',
                        })
                      );
                    }
                    setInputFocused(undefined);
                  }}
                  onChange={(e) => {
                    dispatch(
                      editElementProp({
                        id: currentElement!,
                        height: e.target.value === '' ? '' : e.target.value!,
                      })
                    );
                  }}
                />
              </div>
            </div>
          ),
          Text: (
            <div>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  backgroundColor:
                    inputFocused === 1 ? 'var(--panelPathColor)' : undefined,
                  borderRadius: 6,
                  float: 'left',
                }}
              >
                <p
                  style={{
                    position: 'relative',
                    top: 7,
                    marginLeft: 10,
                    color: 'var(--shortcutIconColor)',
                    fontSize: '.85rem',
                    float: 'left',
                  }}
                >
                  Text
                </p>
                <textarea
                  className="text"
                  style={{
                    position: 'relative',
                    width: 'calc(100% - 54px)',
                    height: `calc(30px + ${textAreaHeight}rem)`,
                    maxHeight: 300,
                    padding: '6.75px 0 0 0',
                    marginRight: 10,
                    borderRadius: 0,
                    fontSize: '.9rem',
                    border: 0,
                    backgroundColor: '#00000000',
                    float: 'right',
                    color: 'var(--fieldTextColor)',
                  }}
                  value={
                    windowList
                      .find((window) => window.id === currentWindow)!
                      .elementData.find((element) => element.id === current)!
                      .text
                  }
                  onFocus={() => {
                    setInputFocused(1);
                  }}
                  onBlur={() => {
                    setInputFocused(undefined);
                  }}
                  onChange={(e) => {
                    setTextAreaHeight(e.target.value!.split('\n').length - 1);
                    dispatch(
                      editElementProp({
                        id: currentElement!,
                        text: e.target.value!,
                      })
                    );
                  }}
                />
              </div>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: 30,
                  backgroundColor:
                    inputFocused === 2 ? 'var(--panelPathColor)' : undefined,
                  borderRadius: 6,
                  float: 'left',
                  marginTop: 5,
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
                  Font Size
                </p>
                <input
                  type="text"
                  style={{
                    position: 'relative',
                    width: 'calc(100% - 85px)',
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
                  value={
                    windowList
                      .find((window) => window.id === currentWindow)!
                      .elementData.find((element) => element.id === current)!
                      .fontSize
                  }
                  onFocus={() => {
                    setInputFocused(2);
                  }}
                  onBlur={() => {
                    setInputFocused(undefined);
                  }}
                  onChange={(e) => {
                    if (
                      !isNaN(parseFloat(e.target.value!)) ||
                      e.target.value === ''
                    ) {
                      dispatch(
                        editElementProp({
                          id: currentElement!,
                          fontSize:
                            e.target.value === ''
                              ? 0
                              : parseFloat(e.target.value!) < 10000
                              ? parseFloat(e.target.value!)
                              : 9999,
                        })
                      );
                    }
                  }}
                />
              </div>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: 30,
                  backgroundColor:
                    inputFocused === 0 ? 'var(--panelPathColor)' : undefined,
                  borderRadius: 6,
                  float: 'left',
                  marginTop: 5,
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
                  Color
                </p>
                <input
                  type="text"
                  style={{
                    position: 'relative',
                    width: 'calc(100% - 61px)',
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
                  value={
                    windowList
                      .find((window) => window.id === currentWindow)!
                      .elementData.find((element) => element.id === current)!
                      .color
                  }
                  onFocus={() => {
                    setInputFocused(0);
                  }}
                  onBlur={() => {
                    setInputFocused(undefined);
                  }}
                  onChange={(e) =>
                    dispatch(
                      editElementProp({
                        id: currentElement!,
                        color: e.target.value!,
                      })
                    )
                  }
                />
              </div>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: 30,
                  backgroundColor:
                    inputFocused === 3 ? 'var(--panelPathColor)' : undefined,
                  borderRadius: 6,
                  float: 'left',
                  marginTop: 5,
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
                  Background Color
                </p>
                <input
                  type="text"
                  style={{
                    position: 'relative',
                    width: 'calc(100% - 139px)',
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
                  value={
                    windowList
                      .find((window) => window.id === currentWindow)!
                      .elementData.find((element) => element.id === current)!
                      .backgroundColor
                  }
                  onFocus={() => {
                    setInputFocused(3);
                  }}
                  onBlur={() => {
                    setInputFocused(undefined);
                  }}
                  onChange={(e) =>
                    dispatch(
                      editElementProp({
                        id: currentElement!,
                        backgroundColor: e.target.value!,
                      })
                    )
                  }
                />
              </div>
            </div>
          ),
          Line: (
            <div>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
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
                  Length
                </p>
                <input
                  type="text"
                  style={{
                    width: 'calc(100% - 71px)',
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
                  value={
                    windowList
                      .find((window) => window.id === currentWindow)!
                      .elementData.find((element) => element.id === current)!
                      .width
                  }
                  onFocus={() => {
                    setInputFocused(0);
                  }}
                  onBlur={() => {
                    if (
                      windowList
                        .find((window) => window.id === currentWindow)!
                        .elementData.find((element) => element.id === current)!
                        .width === ''
                    ) {
                      dispatch(
                        editElementProp({
                          id: currentElement!,
                          width: '0',
                        })
                      );
                    }
                    setInputFocused(undefined);
                  }}
                  onChange={(e) => {
                    dispatch(
                      editElementProp({
                        id: currentElement!,
                        width: e.target.value === '' ? '' : e.target.value!,
                      })
                    );
                  }}
                />
              </div>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: 30,
                  backgroundColor:
                    inputFocused === 3 ? 'var(--panelPathColor)' : undefined,
                  borderRadius: 6,
                  float: 'left',
                  marginTop: 5,
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
                  Color
                </p>
                <input
                  type="text"
                  style={{
                    position: 'relative',
                    width: 'calc(100% - 61px)',
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
                  value={
                    windowList
                      .find((window) => window.id === currentWindow)!
                      .elementData.find((element) => element.id === current)!
                      .backgroundColor
                  }
                  onFocus={() => {
                    setInputFocused(3);
                  }}
                  onBlur={() => {
                    setInputFocused(undefined);
                  }}
                  onChange={(e) =>
                    dispatch(
                      editElementProp({
                        id: currentElement!,
                        backgroundColor: e.target.value!,
                      })
                    )
                  }
                />
              </div>
            </div>
          ),
        }[type]
      }
    </div>
  );
}

export default function Property({
  curr,
  type,
}: {
  curr: number;
  type: ElementType;
}) {
  return (
    <div className="Property">
      {
        {
          text: (
            <div>
              <GetComponent current={curr} type={ComponentType.POSITION} />
              <GetComponent current={curr} type={ComponentType.TEXT} />
            </div>
          ),
          line: (
            <div>
              <GetComponent current={curr} type={ComponentType.POSITION} />
              <GetComponent current={curr} type={ComponentType.LINE} />
            </div>
          ),
          image: (
            <div>
              <GetComponent current={curr} type={ComponentType.POSITION} />
            </div>
          ),
          video: (
            <div>
              <GetComponent current={curr} type={ComponentType.POSITION} />
            </div>
          ),
          button: (
            <div>
              <GetComponent current={curr} type={ComponentType.POSITION} />
            </div>
          ),
          toggle: (
            <div>
              <GetComponent current={curr} type={ComponentType.POSITION} />
            </div>
          ),
          'sl-input': (
            <div>
              <GetComponent current={curr} type={ComponentType.POSITION} />
            </div>
          ),
          'ml-input': (
            <div>
              <GetComponent current={curr} type={ComponentType.POSITION} />
            </div>
          ),
        }[type]
      }
    </div>
  );
}
