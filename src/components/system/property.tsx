import './styles/property.css';

import {
  ElementType,
  ComponentType,
  Part,
  imageExtensions,
  ContentType,
  videoExtensions,
} from '../../data';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setWindowData } from './reduxSlice/windowSlice';
import { Popover } from 'react-tiny-popover';
import { PopContent } from './popcontent';
import { setFalse, setTrue } from './reduxSlice/coverSlice';
import api from '../../config/api';
import { setProjectData } from './reduxSlice/projectSlice';

function GetComponent({
  current,
  type,
}: {
  current: number;
  type: ComponentType;
  disable?: Array<string>;
}) {
  const projectData = useSelector((state: RootState) => state.project.data);
  const windowList = useSelector((state: RootState) => state.window.windowList);
  const isClicked = useSelector((state: RootState) => state.cover.clicked);
  const currentWindow = useSelector(
    (state: RootState) => state.window.currentWindow
  );
  const currentElement = useSelector(
    (state: RootState) => state.window.currentElement
  );
  const assetData = useSelector((state: RootState) => state.asset.assetData);

  const [inputFocused, setInputFocused] = useState<number>();
  const [textAreaHeight, setTextAreaHeight] = useState<number | undefined>(
    type === ComponentType.TEXT
      ? windowList
          .find((window) => window.id === currentWindow)!
          .elementData.find((element) => element.id === current)!
          .text!.split('\n').length - 1
      : 0
  );
  const [showPopover, setShowPopover] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleElement = async () => {
    await api
      .get(`/project/${localStorage.getItem('id')}/${projectData.id}`)
      .then((res) => {
        dispatch(
          setWindowData({
            windowList: res.data.project.windowList,
          })
        );
        dispatch(
          setProjectData({
            id: res.data.project._id,
            name: res.data.project.name,
            owner: res.data.project.owner,
            createAt: res.data.project.createAt,
            modifiedAt: res.data.project.modifiedAt,
          })
        );
      })
      .catch((err) => {
        console.log(
          err.response.data.message
            ? err.response.data.message
            : 'Fail to update database.'
        );
      });
  };

  useEffect(() => {
    windowList
      .find((window) => window.id === currentWindow)
      ?.elementData.filter(
        (element) =>
          element.src !== undefined &&
          assetData.find((asset) => asset.id === element.src) === undefined
      )
      .forEach(async (element) => {
        await api
          .put('/project/element', {
            uid: localStorage.getItem('id'),
            id: projectData.id,
            windowId: currentWindow,
            index: element.id,
            prop: {
              src: undefined,
            },
          })
          .then(async () => await handleElement())
          .catch((err) => {
            console.log(
              err.response.data.message
                ? err.response.data.message
                : 'Fail to update database.'
            );
          });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    assetData,
    currentElement,
    currentWindow,
    dispatch,
    windowList,
    projectData.id,
  ]);

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
                  className="property-input"
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
                    defaultValue={
                      windowList
                        .find((window) => window.id === currentWindow)!
                        .elementData.find((element) => element.id === current)!
                        .x
                    }
                    onFocus={() => {
                      setInputFocused(0);
                    }}
                    onBlur={async () => {
                      if (
                        windowList
                          .find((window) => window.id === currentWindow)!
                          .elementData.find(
                            (element) => element.id === current
                          )!.x === ''
                      ) {
                        await api
                          .put('/project/element', {
                            uid: localStorage.getItem('id'),
                            id: projectData.id,
                            windowId: currentWindow,
                            index: currentElement,
                            prop: {
                              x: '0',
                            },
                          })
                          .then(async () => await handleElement())
                          .catch((err) => {
                            console.log(
                              err.response.data.message
                                ? err.response.data.message
                                : 'Fail to update database.'
                            );
                          });
                      }
                      setInputFocused(undefined);
                    }}
                    onChange={async (event) => {
                      await api
                        .put('/project/element', {
                          uid: localStorage.getItem('id'),
                          id: projectData.id,
                          windowId: currentWindow,
                          index: currentElement,
                          prop: {
                            x:
                              event.target.value === ''
                                ? ''
                                : event.target.value!,
                          },
                        })
                        .then(async () => await handleElement())
                        .catch((err) => {
                          console.log(
                            err.response.data.message
                              ? err.response.data.message
                              : 'Fail to update database.'
                          );
                        });
                    }}
                  />
                </div>
                <div
                  className="property-input"
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
                    defaultValue={
                      windowList
                        .find((window) => window.id === currentWindow)!
                        .elementData.find((element) => element.id === current)!
                        .y
                    }
                    onFocus={() => {
                      setInputFocused(1);
                    }}
                    onBlur={async () => {
                      if (
                        windowList
                          .find((window) => window.id === currentWindow)!
                          .elementData.find(
                            (element) => element.id === current
                          )!.y === ''
                      ) {
                        await api
                          .put('/project/element', {
                            uid: localStorage.getItem('id'),
                            id: projectData.id,
                            windowId: currentWindow,
                            index: currentElement,
                            prop: {
                              y: '0',
                            },
                          })
                          .then(async () => await handleElement())
                          .catch((err) => {
                            console.log(
                              err.response.data.message
                                ? err.response.data.message
                                : 'Fail to update database.'
                            );
                          });
                      }
                      setInputFocused(undefined);
                    }}
                    onChange={async (event) => {
                      await api
                        .put('/project/element', {
                          uid: localStorage.getItem('id'),
                          id: projectData.id,
                          windowId: currentWindow,
                          index: currentElement,
                          prop: {
                            y:
                              event.target.value === ''
                                ? ''
                                : event.target.value!,
                          },
                        })
                        .then(async () => await handleElement())
                        .catch((err) => {
                          console.log(
                            err.response.data.message
                              ? err.response.data.message
                              : 'Fail to update database.'
                          );
                        });
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
                  className="property-input"
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
                    defaultValue={
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
                    onChange={async (event) => {
                      if (
                        !isNaN(
                          parseFloat(event.target.value.replace('%', '')!)
                        ) ||
                        event.target.value.replace('%', '') === ''
                      ) {
                        await api
                          .put('/project/element', {
                            uid: localStorage.getItem('id'),
                            id: projectData.id,
                            windowId: currentWindow,
                            index: currentElement,
                            prop: {
                              xAlign:
                                event.target.value === '%'
                                  ? 0
                                  : parseFloat(
                                      event.target.value.replace('%', '')!
                                    ) < 100
                                  ? parseFloat(
                                      event.target.value.replace('%', '')!
                                    )
                                  : 100,
                            },
                          })
                          .then(async () => await handleElement())
                          .catch((err) => {
                            console.log(
                              err.response.data.message
                                ? err.response.data.message
                                : 'Fail to update database.'
                            );
                          });
                      }
                    }}
                  />
                </div>
                <div
                  className="property-input"
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
                    defaultValue={
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
                    onChange={async (event) => {
                      if (
                        !isNaN(
                          parseFloat(event.target.value.replace('%', '')!)
                        ) ||
                        event.target.value.replace('%', '') === ''
                      ) {
                        await api
                          .put('/project/element', {
                            uid: localStorage.getItem('id'),
                            id: projectData.id,
                            windowId: currentWindow,
                            index: currentElement,
                            prop: {
                              yAlign:
                                event.target.value === '%'
                                  ? 0
                                  : parseFloat(
                                      event.target.value.replace('%', '')!
                                    ) < 100
                                  ? parseFloat(
                                      event.target.value.replace('%', '')!
                                    )
                                  : 100,
                            },
                          })
                          .then(async () => await handleElement())
                          .catch((err) => {
                            console.log(
                              err.response.data.message
                                ? err.response.data.message
                                : 'Fail to update database.'
                            );
                          });
                      }
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
                  className="property-input"
                  style={{
                    width: '100%',
                    height: 30,
                    backgroundColor:
                      inputFocused === 4 ? 'var(--panelPathColor)' : undefined,
                    borderRadius: 6,
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
                    Rotation
                  </p>
                  <input
                    type="text"
                    style={{
                      width: 'calc(100% - 79px)',
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
                    defaultValue={
                      windowList
                        .find((window) => window.id === currentWindow)!
                        .elementData.find((element) => element.id === current)!
                        .rotation
                    }
                    onFocus={() => {
                      setInputFocused(4);
                    }}
                    onBlur={async () => {
                      if (
                        windowList
                          .find((window) => window.id === currentWindow)!
                          .elementData.find(
                            (element) => element.id === current
                          )!.rotation === ''
                      ) {
                        await api
                          .put('/project/element', {
                            uid: localStorage.getItem('id'),
                            id: projectData.id,
                            windowId: currentWindow,
                            index: currentElement,
                            prop: {
                              rotation: '0',
                            },
                          })
                          .then(async () => await handleElement())
                          .catch((err) => {
                            console.log(
                              err.response.data.message
                                ? err.response.data.message
                                : 'Fail to update database.'
                            );
                          });
                      }
                      setInputFocused(undefined);
                    }}
                    onChange={async (event) => {
                      await api
                        .put('/project/element', {
                          uid: localStorage.getItem('id'),
                          id: projectData.id,
                          windowId: currentWindow,
                          index: currentElement,
                          prop: {
                            rotation:
                              event.target.value === ''
                                ? ''
                                : event.target.value!,
                          },
                        })
                        .then(async () => await handleElement())
                        .catch((err) => {
                          console.log(
                            err.response.data.message
                              ? err.response.data.message
                              : 'Fail to update database.'
                          );
                        });
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
                  className="property-input"
                  style={{
                    width: '100%',
                    height: 30,
                    backgroundColor:
                      inputFocused === 5 ? 'var(--panelPathColor)' : undefined,
                    borderRadius: 6,
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
                    Index
                  </p>
                  <input
                    type="text"
                    style={{
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
                    defaultValue={
                      windowList
                        .find((window) => window.id === currentWindow)!
                        .elementData.find((element) => element.id === current)!
                        .index
                    }
                    onFocus={() => {
                      setInputFocused(5);
                    }}
                    onBlur={async () => {
                      if (
                        windowList
                          .find((window) => window.id === currentWindow)!
                          .elementData.find(
                            (element) => element.id === current
                          )!.rotation === ''
                      ) {
                        await api
                          .put('/project/element', {
                            uid: localStorage.getItem('id'),
                            id: projectData.id,
                            windowId: currentWindow,
                            index: currentElement,
                            prop: {
                              index: 0,
                            },
                          })
                          .then(async () => await handleElement())
                          .catch((err) => {
                            console.log(
                              err.response.data.message
                                ? err.response.data.message
                                : 'Fail to update database.'
                            );
                          });
                      }
                      setInputFocused(undefined);
                    }}
                    onChange={async (event) => {
                      if (
                        !isNaN(parseFloat(event.target.value!)) ||
                        event.target.value === ''
                      ) {
                        await api
                          .put('/project/element', {
                            uid: localStorage.getItem('id'),
                            id: projectData.id,
                            windowId: currentWindow,
                            index: currentElement,
                            prop: {
                              index:
                                event.target.value === ''
                                  ? 0
                                  : parseFloat(event.target.value!) < 10000
                                  ? parseFloat(event.target.value!) > 0
                                    ? parseFloat(event.target.value!)
                                    : 0
                                  : 9999,
                            },
                          })
                          .then(async () => await handleElement())
                          .catch((err) => {
                            console.log(
                              err.response.data.message
                                ? err.response.data.message
                                : 'Fail to update database.'
                            );
                          });
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          ),
          Size: (
            <div>
              <div
                style={{
                  width: '100%',
                  height: 30,
                  marginTop: 5,
                }}
              >
                <div
                  className="property-input"
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
                    defaultValue={
                      windowList
                        .find((window) => window.id === currentWindow)!
                        .elementData.find((element) => element.id === current)!
                        .width
                    }
                    onFocus={() => {
                      setInputFocused(0);
                    }}
                    onBlur={async () => {
                      if (
                        windowList
                          .find((window) => window.id === currentWindow)!
                          .elementData.find(
                            (element) => element.id === current
                          )!.width === ''
                      ) {
                        await api
                          .put('/project/element', {
                            uid: localStorage.getItem('id'),
                            id: projectData.id,
                            windowId: currentWindow,
                            index: currentElement,
                            prop: {
                              width: '0',
                            },
                          })
                          .then(async () => await handleElement())
                          .catch((err) => {
                            console.log(
                              err.response.data.message
                                ? err.response.data.message
                                : 'Fail to update database.'
                            );
                          });
                      }
                      setInputFocused(undefined);
                    }}
                    onChange={async (event) => {
                      await api
                        .put('/project/element', {
                          uid: localStorage.getItem('id'),
                          id: projectData.id,
                          windowId: currentWindow,
                          index: currentElement,
                          prop: {
                            width:
                              event.target.value === ''
                                ? ''
                                : event.target.value!,
                          },
                        })
                        .then(async () => await handleElement())
                        .catch((err) => {
                          console.log(
                            err.response.data.message
                              ? err.response.data.message
                              : 'Fail to update database.'
                          );
                        });
                    }}
                  />
                </div>
                <div
                  className="property-input"
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
                    defaultValue={
                      windowList
                        .find((window) => window.id === currentWindow)!
                        .elementData.find((element) => element.id === current)!
                        .height
                    }
                    onFocus={() => {
                      setInputFocused(1);
                    }}
                    onBlur={async () => {
                      if (
                        windowList
                          .find((window) => window.id === currentWindow)!
                          .elementData.find(
                            (element) => element.id === current
                          )!.height === ''
                      ) {
                        await api
                          .put('/project/element', {
                            uid: localStorage.getItem('id'),
                            id: projectData.id,
                            windowId: currentWindow,
                            index: currentElement,
                            prop: {
                              height: '0',
                            },
                          })
                          .then(async () => await handleElement())
                          .catch((err) => {
                            console.log(
                              err.response.data.message
                                ? err.response.data.message
                                : 'Fail to update database.'
                            );
                          });
                      }
                      setInputFocused(undefined);
                    }}
                    onChange={async (event) => {
                      await api
                        .put('/project/element', {
                          uid: localStorage.getItem('id'),
                          id: projectData.id,
                          windowId: currentWindow,
                          index: currentElement,
                          prop: {
                            height:
                              event.target.value === ''
                                ? ''
                                : event.target.value!,
                          },
                        })
                        .then(async () => await handleElement())
                        .catch((err) => {
                          console.log(
                            err.response.data.message
                              ? err.response.data.message
                              : 'Fail to update database.'
                          );
                        });
                    }}
                  />
                </div>
              </div>
            </div>
          ),
          Border: (
            <div>
              <div
                style={{
                  width: '100%',
                  height: 30,
                  marginTop: 5,
                }}
              >
                <div
                  className="property-input"
                  style={{
                    width: '100%',
                    height: 30,
                    backgroundColor:
                      inputFocused === 0 ? 'var(--panelPathColor)' : undefined,
                    borderRadius: 6,
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
                    Border Radius
                  </p>
                  <input
                    type="text"
                    style={{
                      width: 'calc(100% - 115px)',
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
                    defaultValue={
                      windowList
                        .find((window) => window.id === currentWindow)!
                        .elementData.find((element) => element.id === current)!
                        .borderRadius
                    }
                    onFocus={() => {
                      setInputFocused(0);
                    }}
                    onBlur={async () => {
                      if (
                        windowList
                          .find((window) => window.id === currentWindow)!
                          .elementData.find(
                            (element) => element.id === current
                          )!.borderRadius === ''
                      ) {
                        await api
                          .put('/project/element', {
                            uid: localStorage.getItem('id'),
                            id: projectData.id,
                            windowId: currentWindow,
                            index: currentElement,
                            prop: {
                              borderRadius: '0',
                            },
                          })
                          .then(async () => await handleElement())
                          .catch((err) => {
                            console.log(
                              err.response.data.message
                                ? err.response.data.message
                                : 'Fail to update database.'
                            );
                          });
                      }
                      setInputFocused(undefined);
                    }}
                    onChange={async (event) => {
                      await api
                        .put('/project/element', {
                          uid: localStorage.getItem('id'),
                          id: projectData.id,
                          windowId: currentWindow,
                          index: currentElement,
                          prop: {
                            borderRadius:
                              event.target.value === ''
                                ? ''
                                : event.target.value!,
                          },
                        })
                        .then(async () => await handleElement())
                        .catch((err) => {
                          console.log(
                            err.response.data.message
                              ? err.response.data.message
                              : 'Fail to update database.'
                          );
                        });
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
                  className="property-input"
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: 30,
                    backgroundColor:
                      inputFocused === 1 ? 'var(--panelPathColor)' : undefined,
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
                    Border Color
                  </p>
                  <input
                    type="text"
                    style={{
                      position: 'relative',
                      width: 'calc(100% - 106px)',
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
                    defaultValue={
                      windowList
                        .find((window) => window.id === currentWindow)!
                        .elementData.find((element) => element.id === current)!
                        .borderColor
                    }
                    onFocus={() => {
                      setInputFocused(1);
                    }}
                    onBlur={() => {
                      setInputFocused(undefined);
                    }}
                    onChange={async (event) =>
                      await api
                        .put('/project/element', {
                          uid: localStorage.getItem('id'),
                          id: projectData.id,
                          windowId: currentWindow,
                          index: currentElement,
                          prop: {
                            borderColor: event.target.value!,
                          },
                        })
                        .then(async () => await handleElement())
                        .catch((err) => {
                          console.log(
                            err.response.data.message
                              ? err.response.data.message
                              : 'Fail to update database.'
                          );
                        })
                    }
                  />
                </div>
              </div>
            </div>
          ),
          Text: (
            <div>
              <div
                style={{
                  width: '100%',
                  height: 30,
                }}
              >
                <div
                  className="property-input"
                  style={{
                    position: 'relative',
                    width: '100%',
                    backgroundColor:
                      inputFocused === 1 ? 'var(--panelPathColor)' : undefined,
                    borderRadius: 6,
                    float: 'left',
                    minHeight: 30,
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
                    defaultValue={
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
                    onChange={async (event) => {
                      setTextAreaHeight(
                        event.target.value!.split('\n').length - 1
                      );

                      await api
                        .put('/project/element', {
                          uid: localStorage.getItem('id'),
                          id: projectData.id,
                          windowId: currentWindow,
                          index: currentElement,
                          prop: {
                            text: event.target.value!,
                          },
                        })
                        .then(async () => await handleElement())
                        .catch((err) => {
                          console.log(
                            err.response.data.message
                              ? err.response.data.message
                              : 'Fail to update database.'
                          );
                        });
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  width: '100%',
                  height: 30,
                }}
              >
                <div
                  className="property-input"
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
                    defaultValue={
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
                    onChange={async (event) => {
                      if (
                        !isNaN(parseFloat(event.target.value!)) ||
                        event.target.value === ''
                      ) {
                        await api
                          .put('/project/element', {
                            uid: localStorage.getItem('id'),
                            id: projectData.id,
                            windowId: currentWindow,
                            index: currentElement,
                            prop: {
                              fontSize:
                                event.target.value === ''
                                  ? 0
                                  : parseFloat(event.target.value!) < 10000
                                  ? parseFloat(event.target.value!)
                                  : 9999,
                            },
                          })
                          .then(async () => await handleElement())
                          .catch((err) => {
                            console.log(
                              err.response.data.message
                                ? err.response.data.message
                                : 'Fail to update database.'
                            );
                          });
                      }
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  width: '100%',
                  height: 30,
                }}
              >
                <div
                  className="property-input"
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
                    defaultValue={
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
                    onChange={async (event) =>
                      await api
                        .put('/project/element', {
                          uid: localStorage.getItem('id'),
                          id: projectData.id,
                          windowId: currentWindow,
                          index: currentElement,
                          prop: {
                            color: event.target.value!,
                          },
                        })
                        .then(async () => await handleElement())
                        .catch((err) => {
                          console.log(
                            err.response.data.message
                              ? err.response.data.message
                              : 'Fail to update database.'
                          );
                        })
                    }
                  />
                </div>
              </div>
            </div>
          ),
          Line: (
            <div>
              <div
                style={{
                  width: '100%',
                  height: 30,
                }}
              >
                <Popover
                  isOpen={showPopover}
                  positions={['bottom']}
                  padding={5}
                  align="start"
                  reposition={false}
                  onClickOutside={() => {
                    if (isClicked) {
                      dispatch(setFalse());
                      setShowPopover(false);
                    }
                  }}
                  content={() => (
                    <PopContent
                      isSelection={true}
                      contents={[
                        {
                          text: 'Horizontal line',
                          id: 0,
                          selected:
                            windowList
                              .find((window) => window.id === currentWindow)!
                              .elementData.find(
                                (element) => element.id === current
                              )!.part === Part.HORIZONTAL,
                          onClick: async () => {
                            if (
                              windowList
                                .find((window) => window.id === currentWindow)!
                                .elementData.find(
                                  (element) => element.id === current
                                )!.part === Part.VERTICAL
                            ) {
                              await api
                                .put('/project/element', {
                                  uid: localStorage.getItem('id'),
                                  id: projectData.id,
                                  windowId: currentWindow,
                                  index: currentElement,
                                  prop: {
                                    width: windowList
                                      .find(
                                        (window) => window.id === currentWindow
                                      )!
                                      .elementData.find(
                                        (element) => element.id === current
                                      )!.height,
                                    height: '1',
                                    part: Part.HORIZONTAL,
                                  },
                                })
                                .then(async () => await handleElement())
                                .catch((err) => {
                                  console.log(
                                    err.response.data.message
                                      ? err.response.data.message
                                      : 'Fail to update database.'
                                  );
                                });
                            }
                            dispatch(setFalse());
                            setShowPopover(false);
                          },
                        },
                        {
                          text: 'Vertical line',
                          id: 1,
                          selected:
                            windowList
                              .find((window) => window.id === currentWindow)!
                              .elementData.find(
                                (element) => element.id === current
                              )!.part === Part.VERTICAL,
                          onClick: async () => {
                            if (
                              windowList
                                .find((window) => window.id === currentWindow)!
                                .elementData.find(
                                  (element) => element.id === current
                                )!.part === Part.HORIZONTAL
                            ) {
                              await api
                                .put('/project/element', {
                                  uid: localStorage.getItem('id'),
                                  id: projectData.id,
                                  windowId: currentWindow,
                                  index: currentElement,
                                  prop: {
                                    height: windowList
                                      .find(
                                        (window) => window.id === currentWindow
                                      )!
                                      .elementData.find(
                                        (element) => element.id === current
                                      )!.width,
                                    width: '1',
                                    part: Part.VERTICAL,
                                  },
                                })
                                .then(async () => await handleElement())
                                .catch((err) => {
                                  console.log(
                                    err.response.data.message
                                      ? err.response.data.message
                                      : 'Fail to update database.'
                                  );
                                });
                            }
                            dispatch(setFalse());
                            setShowPopover(false);
                          },
                        },
                      ]}
                    />
                  )}
                >
                  <div
                    className="property-input"
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: 30,
                      backgroundColor:
                        inputFocused === 1
                          ? 'var(--panelPathColor)'
                          : undefined,
                      borderRadius: 6,
                      float: 'left',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      dispatch(
                        showPopover ? dispatch(setFalse()) : dispatch(setTrue())
                      );
                      setShowPopover(!showPopover);
                    }}
                    onMouseEnter={() => setInputFocused(1)}
                    onMouseLeave={() => {
                      if (!showPopover) {
                        setInputFocused(undefined);
                      }
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
                      {windowList
                        .find((window) => window.id === currentWindow)!
                        .elementData.find((element) => element.id === current)!
                        .part === Part.HORIZONTAL
                        ? 'Horizontal line'
                        : 'Vertical line'}
                    </p>
                    <svg
                      style={{
                        position: 'relative',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        float: 'right',
                        marginRight: 10,
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="12.5"
                      height="12.5"
                      fill="var(--shortcutIconColor)"
                      viewBox="0 0 16 16"
                    >
                      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                  </div>
                </Popover>
              </div>
              <div
                style={{
                  width: '100%',
                  height: 30,
                }}
              >
                <div
                  className="property-input"
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
                    defaultValue={
                      windowList
                        .find((window) => window.id === currentWindow)!
                        .elementData.find((element) => element.id === current)!
                        .part === Part.HORIZONTAL
                        ? windowList
                            .find((window) => window.id === currentWindow)!
                            .elementData.find(
                              (element) => element.id === current
                            )!.width
                        : windowList
                            .find((window) => window.id === currentWindow)!
                            .elementData.find(
                              (element) => element.id === current
                            )!.height
                    }
                    onFocus={() => {
                      setInputFocused(0);
                    }}
                    onBlur={async () => {
                      if (
                        windowList
                          .find((window) => window.id === currentWindow)!
                          .elementData.find(
                            (element) => element.id === current
                          )!.part === Part.HORIZONTAL &&
                        windowList
                          .find((window) => window.id === currentWindow)!
                          .elementData.find(
                            (element) => element.id === current
                          )!.width === ''
                      ) {
                        await api
                          .put('/project/element', {
                            uid: localStorage.getItem('id'),
                            id: projectData.id,
                            windowId: currentWindow,
                            index: currentElement,
                            prop: {
                              width: '0',
                            },
                          })
                          .then(async () => await handleElement())
                          .catch((err) => {
                            console.log(
                              err.response.data.message
                                ? err.response.data.message
                                : 'Fail to update database.'
                            );
                          });
                      } else if (
                        windowList
                          .find((window) => window.id === currentWindow)!
                          .elementData.find(
                            (element) => element.id === current
                          )!.part === Part.VERTICAL &&
                        windowList
                          .find((window) => window.id === currentWindow)!
                          .elementData.find(
                            (element) => element.id === current
                          )!.height === ''
                      ) {
                        await api
                          .put('/project/element', {
                            uid: localStorage.getItem('id'),
                            id: projectData.id,
                            windowId: currentWindow,
                            index: currentElement,
                            prop: {
                              height: '0',
                            },
                          })
                          .then(async () => await handleElement())
                          .catch((err) => {
                            console.log(
                              err.response.data.message
                                ? err.response.data.message
                                : 'Fail to update database.'
                            );
                          });
                      }
                      setInputFocused(undefined);
                    }}
                    onChange={async (event) => {
                      windowList
                        .find((window) => window.id === currentWindow)!
                        .elementData.find((element) => element.id === current)!
                        .part === Part.HORIZONTAL
                        ? await api
                            .put('/project/element', {
                              uid: localStorage.getItem('id'),
                              id: projectData.id,
                              windowId: currentWindow,
                              index: currentElement,
                              prop: {
                                width:
                                  event.target.value === ''
                                    ? ''
                                    : event.target.value!,
                              },
                            })
                            .then(async () => await handleElement())
                            .catch((err) => {
                              console.log(
                                err.response.data.message
                                  ? err.response.data.message
                                  : 'Fail to update database.'
                              );
                            })
                        : await api
                            .put('/project/element', {
                              uid: localStorage.getItem('id'),
                              id: projectData.id,
                              windowId: currentWindow,
                              index: currentElement,
                              prop: {
                                height:
                                  event.target.value === ''
                                    ? ''
                                    : event.target.value!,
                              },
                            })
                            .then(async () => await handleElement())
                            .catch((err) => {
                              console.log(
                                err.response.data.message
                                  ? err.response.data.message
                                  : 'Fail to update database.'
                              );
                            });
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  width: '100%',
                  height: 30,
                }}
              >
                <div
                  className="property-input"
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
                    defaultValue={
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
                    onChange={async (event) =>
                      await api
                        .put('/project/element', {
                          uid: localStorage.getItem('id'),
                          id: projectData.id,
                          windowId: currentWindow,
                          index: currentElement,
                          prop: {
                            backgroundColor: event.target.value!,
                          },
                        })
                        .then(async () => await handleElement())
                        .catch((err) => {
                          console.log(
                            err.response.data.message
                              ? err.response.data.message
                              : 'Fail to update database.'
                          );
                        })
                    }
                  />
                </div>
              </div>
            </div>
          ),
          Image: (
            <div>
              <div
                style={{
                  width: '100%',
                  height: 30,
                  marginTop: 5,
                }}
              >
                <Popover
                  isOpen={showPopover}
                  positions={['bottom']}
                  padding={5}
                  align="start"
                  reposition={false}
                  onClickOutside={() => {
                    if (isClicked) {
                      dispatch(setFalse());
                      setShowPopover(false);
                    }
                  }}
                  content={() => (
                    <PopContent
                      isSelection={true}
                      contents={
                        assetData.filter(
                          (asset) =>
                            imageExtensions.includes(
                              asset.extension?.substr(1)!
                            ) && asset.type === 'file'
                        ).length === 0
                          ? [
                              {
                                text: 'NO ASSETS AVAILABLE',
                                type: ContentType.CATEGORY,
                              },
                            ]
                          : assetData
                              .filter(
                                (asset) =>
                                  imageExtensions.includes(
                                    asset.extension?.substr(1)!
                                  ) && asset.type === 'file'
                              )
                              .map((asset) => ({
                                text: `${asset.name}${asset.extension}`,
                                id: asset.id,
                                selected:
                                  windowList
                                    .find(
                                      (window) => window.id === currentWindow
                                    )!
                                    .elementData.find(
                                      (element) => element.id === current
                                    )!.src === asset.id,
                                onClick: async () => {
                                  await api
                                    .put('/project/element', {
                                      uid: localStorage.getItem('id'),
                                      id: projectData.id,
                                      windowId: currentWindow,
                                      index: currentElement,
                                      prop: {
                                        src: asset.id,
                                      },
                                    })
                                    .then(async () => await handleElement())
                                    .catch((err) => {
                                      console.log(
                                        err.response.data.message
                                          ? err.response.data.message
                                          : 'Fail to update database.'
                                      );
                                    });
                                  dispatch(setFalse());
                                  setShowPopover(false);
                                },
                              }))
                      }
                    />
                  )}
                >
                  <div
                    className="property-input"
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: 30,
                      backgroundColor:
                        inputFocused === 0
                          ? 'var(--panelPathColor)'
                          : undefined,
                      borderRadius: 6,
                      float: 'left',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      dispatch(
                        showPopover ? dispatch(setFalse()) : dispatch(setTrue())
                      );
                      setShowPopover(!showPopover);
                    }}
                    onMouseEnter={() => setInputFocused(0)}
                    onMouseLeave={() => {
                      if (!showPopover) {
                        setInputFocused(undefined);
                      }
                    }}
                  >
                    <p
                      style={{
                        width: 'calc(100% - 40px)',
                        position: 'relative',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        marginLeft: 10,
                        color: 'var(--shortcutIconColor)',
                        fontSize: '.85rem',
                        float: 'left',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {windowList
                        .find((window) => window.id === currentWindow)!
                        .elementData.find((element) => element.id === current)!
                        .src === undefined ||
                      assetData.find(
                        (asset) =>
                          asset.id ===
                          windowList
                            .find((window) => window.id === currentWindow)!
                            .elementData.find(
                              (element) => element.id === current
                            )!.src
                      ) === undefined
                        ? 'No Image'
                        : `${
                            assetData.find(
                              (asset) =>
                                asset.id ===
                                windowList
                                  .find(
                                    (window) => window.id === currentWindow
                                  )!
                                  .elementData.find(
                                    (element) => element.id === current
                                  )!.src
                            )?.name
                          }${
                            assetData.find(
                              (asset) =>
                                asset.id ===
                                windowList
                                  .find(
                                    (window) => window.id === currentWindow
                                  )!
                                  .elementData.find(
                                    (element) => element.id === current
                                  )!.src
                            )?.extension
                          }`}
                    </p>
                    <svg
                      style={{
                        position: 'relative',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        float: 'right',
                        marginRight: 10,
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="12.5"
                      height="12.5"
                      fill="var(--shortcutIconColor)"
                      viewBox="0 0 16 16"
                    >
                      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                  </div>
                </Popover>
              </div>
              <div
                style={{
                  width: '100%',
                  height: 30,
                  marginTop: 5,
                }}
              >
                <div
                  className="property-input"
                  style={{
                    width: '100%',
                    height: 30,
                    backgroundColor:
                      inputFocused === 1 ? 'var(--panelPathColor)' : undefined,
                    borderRadius: 6,
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
                    Border Radius
                  </p>
                  <input
                    type="text"
                    style={{
                      width: 'calc(100% - 115px)',
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
                    defaultValue={
                      windowList
                        .find((window) => window.id === currentWindow)!
                        .elementData.find((element) => element.id === current)!
                        .borderRadius
                    }
                    onFocus={() => {
                      setInputFocused(1);
                    }}
                    onBlur={async () => {
                      if (
                        windowList
                          .find((window) => window.id === currentWindow)!
                          .elementData.find(
                            (element) => element.id === current
                          )!.borderRadius === ''
                      ) {
                        await api
                          .put('/project/element', {
                            uid: localStorage.getItem('id'),
                            id: projectData.id,
                            windowId: currentWindow,
                            index: currentElement,
                            prop: {
                              borderRadius: '0',
                            },
                          })
                          .then(async () => await handleElement())
                          .catch((err) => {
                            console.log(
                              err.response.data.message
                                ? err.response.data.message
                                : 'Fail to update database.'
                            );
                          });
                      }
                      setInputFocused(undefined);
                    }}
                    onChange={async (event) => {
                      await api
                        .put('/project/element', {
                          uid: localStorage.getItem('id'),
                          id: projectData.id,
                          windowId: currentWindow,
                          index: currentElement,
                          prop: {
                            borderRadius:
                              event.target.value === ''
                                ? ''
                                : event.target.value!,
                          },
                        })
                        .then(async () => await handleElement())
                        .catch((err) => {
                          console.log(
                            err.response.data.message
                              ? err.response.data.message
                              : 'Fail to update database.'
                          );
                        });
                    }}
                  />
                </div>
              </div>
            </div>
          ),
          Video: (
            <div>
              <div
                style={{
                  width: '100%',
                  height: 30,
                  marginTop: 5,
                }}
              >
                <Popover
                  isOpen={showPopover}
                  positions={['bottom']}
                  padding={5}
                  align="start"
                  reposition={false}
                  onClickOutside={() => {
                    if (isClicked) {
                      dispatch(setFalse());
                      setShowPopover(false);
                    }
                  }}
                  content={() => (
                    <PopContent
                      isSelection={true}
                      contents={
                        assetData.filter(
                          (asset) =>
                            videoExtensions.includes(
                              asset.extension?.substr(1)!
                            ) && asset.type === 'file'
                        ).length === 0
                          ? [
                              {
                                text: 'NO ASSETS AVAILABLE',
                                type: ContentType.CATEGORY,
                              },
                            ]
                          : assetData
                              .filter(
                                (asset) =>
                                  videoExtensions.includes(
                                    asset.extension?.substr(1)!
                                  ) && asset.type === 'file'
                              )
                              .map((asset) => ({
                                text: `${asset.name}${asset.extension}`,
                                id: asset.id,
                                selected:
                                  windowList
                                    .find(
                                      (window) => window.id === currentWindow
                                    )!
                                    .elementData.find(
                                      (element) => element.id === current
                                    )!.src === asset.id,
                                onClick: async () => {
                                  await api
                                    .put('/project/element', {
                                      uid: localStorage.getItem('id'),
                                      id: projectData.id,
                                      windowId: currentWindow,
                                      index: currentElement,
                                      prop: {
                                        src: asset.id,
                                      },
                                    })
                                    .then(async () => await handleElement())
                                    .catch((err) => {
                                      console.log(
                                        err.response.data.message
                                          ? err.response.data.message
                                          : 'Fail to update database.'
                                      );
                                    });
                                  dispatch(setFalse());
                                  setShowPopover(false);
                                },
                              }))
                      }
                    />
                  )}
                >
                  <div
                    className="property-input"
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: 30,
                      backgroundColor:
                        inputFocused === 0
                          ? 'var(--panelPathColor)'
                          : undefined,
                      borderRadius: 6,
                      float: 'left',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      dispatch(
                        showPopover ? dispatch(setFalse()) : dispatch(setTrue())
                      );
                      setShowPopover(!showPopover);
                    }}
                    onMouseEnter={() => setInputFocused(0)}
                    onMouseLeave={() => {
                      if (!showPopover) {
                        setInputFocused(undefined);
                      }
                    }}
                  >
                    <p
                      style={{
                        width: 'calc(100% - 40px)',
                        position: 'relative',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        marginLeft: 10,
                        color: 'var(--shortcutIconColor)',
                        fontSize: '.85rem',
                        float: 'left',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {windowList
                        .find((window) => window.id === currentWindow)!
                        .elementData.find((element) => element.id === current)!
                        .src === undefined ||
                      assetData.find(
                        (asset) =>
                          asset.id ===
                          windowList
                            .find((window) => window.id === currentWindow)!
                            .elementData.find(
                              (element) => element.id === current
                            )!.src
                      ) === undefined
                        ? 'No Video'
                        : `${
                            assetData.find(
                              (asset) =>
                                asset.id ===
                                windowList
                                  .find(
                                    (window) => window.id === currentWindow
                                  )!
                                  .elementData.find(
                                    (element) => element.id === current
                                  )!.src
                            )?.name
                          }${
                            assetData.find(
                              (asset) =>
                                asset.id ===
                                windowList
                                  .find(
                                    (window) => window.id === currentWindow
                                  )!
                                  .elementData.find(
                                    (element) => element.id === current
                                  )!.src
                            )?.extension
                          }`}
                    </p>
                    <svg
                      style={{
                        position: 'relative',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        float: 'right',
                        marginRight: 10,
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="12.5"
                      height="12.5"
                      fill="var(--shortcutIconColor)"
                      viewBox="0 0 16 16"
                    >
                      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                  </div>
                </Popover>
              </div>
              <div
                style={{
                  width: '100%',
                  height: 30,
                  marginTop: 5,
                }}
              >
                <div
                  className="property-input"
                  style={{
                    width: '100%',
                    height: 30,
                    backgroundColor:
                      inputFocused === 1 ? 'var(--panelPathColor)' : undefined,
                    borderRadius: 6,
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
                    Border Radius
                  </p>
                  <input
                    type="text"
                    style={{
                      width: 'calc(100% - 115px)',
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
                    defaultValue={
                      windowList
                        .find((window) => window.id === currentWindow)!
                        .elementData.find((element) => element.id === current)!
                        .borderRadius
                    }
                    onFocus={() => {
                      setInputFocused(1);
                    }}
                    onBlur={async () => {
                      if (
                        windowList
                          .find((window) => window.id === currentWindow)!
                          .elementData.find(
                            (element) => element.id === current
                          )!.borderRadius === ''
                      ) {
                        await api
                          .put('/project/element', {
                            uid: localStorage.getItem('id'),
                            id: projectData.id,
                            windowId: currentWindow,
                            index: currentElement,
                            prop: {
                              borderRadius: '0',
                            },
                          })
                          .then(async () => await handleElement())
                          .catch((err) => {
                            console.log(
                              err.response.data.message
                                ? err.response.data.message
                                : 'Fail to update database.'
                            );
                          });
                      }
                      setInputFocused(undefined);
                    }}
                    onChange={async (event) => {
                      await api
                        .put('/project/element', {
                          uid: localStorage.getItem('id'),
                          id: projectData.id,
                          windowId: currentWindow,
                          index: currentElement,
                          prop: {
                            borderRadius:
                              event.target.value === ''
                                ? ''
                                : event.target.value!,
                          },
                        })
                        .then(async () => await handleElement())
                        .catch((err) => {
                          console.log(
                            err.response.data.message
                              ? err.response.data.message
                              : 'Fail to update database.'
                          );
                        });
                    }}
                  />
                </div>
              </div>
            </div>
          ),
          Button: (
            <div>
              <div
                style={{
                  width: '100%',
                  height: 30,
                }}
              >
                <div
                  className="property-input"
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
                    defaultValue={
                      windowList
                        .find((window) => window.id === currentWindow)!
                        .elementData.find((element) => element.id === current)!
                        .backgroundColor
                    }
                    onFocus={() => {
                      setInputFocused(0);
                    }}
                    onBlur={() => {
                      setInputFocused(undefined);
                    }}
                    onChange={async (event) =>
                      await api
                        .put('/project/element', {
                          uid: localStorage.getItem('id'),
                          id: projectData.id,
                          windowId: currentWindow,
                          index: currentElement,
                          prop: {
                            backgroundColor: event.target.value!,
                          },
                        })
                        .then(async () => await handleElement())
                        .catch((err) => {
                          console.log(
                            err.response.data.message
                              ? err.response.data.message
                              : 'Fail to update database.'
                          );
                        })
                    }
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
                  className="property-input"
                  style={{
                    width: '100%',
                    height: 30,
                    backgroundColor:
                      inputFocused === 1 ? 'var(--panelPathColor)' : undefined,
                    borderRadius: 6,
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
                    Border Radius
                  </p>
                  <input
                    type="text"
                    style={{
                      width: 'calc(100% - 115px)',
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
                    defaultValue={
                      windowList
                        .find((window) => window.id === currentWindow)!
                        .elementData.find((element) => element.id === current)!
                        .borderRadius
                    }
                    onFocus={() => {
                      setInputFocused(1);
                    }}
                    onBlur={async () => {
                      if (
                        windowList
                          .find((window) => window.id === currentWindow)!
                          .elementData.find(
                            (element) => element.id === current
                          )!.borderRadius === ''
                      ) {
                        await api
                          .put('/project/element', {
                            uid: localStorage.getItem('id'),
                            id: projectData.id,
                            windowId: currentWindow,
                            index: currentElement,
                            prop: {
                              borderRadius: '0',
                            },
                          })
                          .then(async () => await handleElement())
                          .catch((err) => {
                            console.log(
                              err.response.data.message
                                ? err.response.data.message
                                : 'Fail to update database.'
                            );
                          });
                      }
                      setInputFocused(undefined);
                    }}
                    onChange={async (event) => {
                      await api
                        .put('/project/element', {
                          uid: localStorage.getItem('id'),
                          id: projectData.id,
                          windowId: currentWindow,
                          index: currentElement,
                          prop: {
                            borderRadius:
                              event.target.value === ''
                                ? ''
                                : event.target.value!,
                          },
                        })
                        .then(async () => await handleElement())
                        .catch((err) => {
                          console.log(
                            err.response.data.message
                              ? err.response.data.message
                              : 'Fail to update database.'
                          );
                        });
                    }}
                  />
                </div>
              </div>
            </div>
          ),
          Checkbox: (
            <div>
              <div
                style={{
                  width: '100%',
                  height: 30,
                  marginTop: 5,
                }}
              >
                <div
                  className="property-input"
                  style={{
                    width: '100%',
                    height: 30,
                    borderRadius: 6,
                    float: 'left',
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      marginLeft: 10,
                      width: 12,
                      height: 12,
                      borderRadius: '20%',
                      boxSizing: 'border-box',
                      border: windowList
                        .find((window) => window.id === currentWindow)!
                        .elementData.find((element) => element.id === current)!
                        .isChecked
                        ? undefined
                        : '1px solid var(--shortcutIconColor)',
                      float: 'left',
                      cursor: 'pointer',
                    }}
                    onClick={async () => {
                      await api
                        .put('/project/element', {
                          uid: localStorage.getItem('id'),
                          id: projectData.id,
                          windowId: currentWindow,
                          index: currentElement,
                          prop: {
                            isChecked: !windowList
                              .find((window) => window.id === currentWindow)!
                              .elementData.find(
                                (element) => element.id === current
                              )!.isChecked,
                          },
                        })
                        .then(async () => await handleElement())
                        .catch((err) => {
                          console.log(
                            err.response.data.message
                              ? err.response.data.message
                              : 'Fail to update database.'
                          );
                        });
                    }}
                  >
                    {windowList
                      .find((window) => window.id === currentWindow)!
                      .elementData.find((element) => element.id === current)!
                      .isChecked ? (
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          backgroundColor: 'var(--shortcutIconColor)',
                          borderRadius: '20%',
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="#fff"
                          style={{
                            position: 'relative',
                            top: -1.75,
                            textAlign: 'center',
                          }}
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    ) : null}
                  </div>
                  <p
                    style={{
                      position: 'relative',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      marginLeft: 6,
                      color: 'var(--shortcutIconColor)',
                      fontSize: '.85rem',
                      float: 'left',
                    }}
                  >
                    Selected
                  </p>
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
                  className="property-input"
                  style={{
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
                    Size
                  </p>
                  <input
                    type="text"
                    style={{
                      width: 'calc(100% - 53px)',
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
                    defaultValue={
                      windowList
                        .find((window) => window.id === currentWindow)!
                        .elementData.find((element) => element.id === current)!
                        .width
                    }
                    onFocus={() => {
                      setInputFocused(0);
                    }}
                    onBlur={async () => {
                      if (
                        windowList
                          .find((window) => window.id === currentWindow)!
                          .elementData.find(
                            (element) => element.id === current
                          )!.width === '' ||
                        windowList
                          .find((window) => window.id === currentWindow)!
                          .elementData.find(
                            (element) => element.id === current
                          )!.height === ''
                      ) {
                        await api
                          .put('/project/element', {
                            uid: localStorage.getItem('id'),
                            id: projectData.id,
                            windowId: currentWindow,
                            index: currentElement,
                            prop: {
                              width: '0',
                              height: '0',
                            },
                          })
                          .then(async () => await handleElement())
                          .catch((err) => {
                            console.log(
                              err.response.data.message
                                ? err.response.data.message
                                : 'Fail to update database.'
                            );
                          });
                      }
                      setInputFocused(undefined);
                    }}
                    onChange={async (event) => {
                      await api
                        .put('/project/element', {
                          uid: localStorage.getItem('id'),
                          id: projectData.id,
                          windowId: currentWindow,
                          index: currentElement,
                          prop: {
                            width:
                              event.target.value === ''
                                ? ''
                                : event.target.value!,
                            height:
                              event.target.value === ''
                                ? ''
                                : event.target.value!,
                          },
                        })
                        .then(async () => await handleElement())
                        .catch((err) => {
                          console.log(
                            err.response.data.message
                              ? err.response.data.message
                              : 'Fail to update database.'
                          );
                        });
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  width: '100%',
                  height: 30,
                }}
              >
                <div
                  className="property-input"
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: 30,
                    backgroundColor:
                      inputFocused === 1 ? 'var(--panelPathColor)' : undefined,
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
                    defaultValue={
                      windowList
                        .find((window) => window.id === currentWindow)!
                        .elementData.find((element) => element.id === current)!
                        .color
                    }
                    onFocus={() => {
                      setInputFocused(1);
                    }}
                    onBlur={() => {
                      setInputFocused(undefined);
                    }}
                    onChange={async (event) =>
                      await api
                        .put('/project/element', {
                          uid: localStorage.getItem('id'),
                          id: projectData.id,
                          windowId: currentWindow,
                          index: currentElement,
                          prop: {
                            color: event.target.value!,
                          },
                        })
                        .then(async () => await handleElement())
                        .catch((err) => {
                          console.log(
                            err.response.data.message
                              ? err.response.data.message
                              : 'Fail to update database.'
                          );
                        })
                    }
                  />
                </div>
              </div>
              <div
                style={{
                  width: '100%',
                  height: 30,
                  marginTop: 10,
                }}
              >
                <div
                  className="property-input"
                  style={{
                    position: 'relative',
                    width: '100%',
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
                    defaultValue={
                      windowList
                        .find((window) => window.id === currentWindow)!
                        .elementData.find((element) => element.id === current)!
                        .backgroundColor
                    }
                    onFocus={() => {
                      setInputFocused(2);
                    }}
                    onBlur={() => {
                      setInputFocused(undefined);
                    }}
                    onChange={async (event) =>
                      await api
                        .put('/project/element', {
                          uid: localStorage.getItem('id'),
                          id: projectData.id,
                          windowId: currentWindow,
                          index: currentElement,
                          prop: {
                            backgroundColor: event.target.value!,
                          },
                        })
                        .then(async () => await handleElement())
                        .catch((err) => {
                          console.log(
                            err.response.data.message
                              ? err.response.data.message
                              : 'Fail to update database.'
                          );
                        })
                    }
                  />
                </div>
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
              <GetComponent current={curr} type={ComponentType.SIZE} />
              <GetComponent current={curr} type={ComponentType.IMAGE} />
            </div>
          ),
          video: (
            <div>
              <GetComponent current={curr} type={ComponentType.POSITION} />
              <GetComponent current={curr} type={ComponentType.SIZE} />
              <GetComponent current={curr} type={ComponentType.VIDEO} />
            </div>
          ),
          button: (
            <div>
              <GetComponent current={curr} type={ComponentType.POSITION} />
              <GetComponent current={curr} type={ComponentType.SIZE} />
              <GetComponent current={curr} type={ComponentType.TEXT} />
              <GetComponent current={curr} type={ComponentType.BUTTON} />
            </div>
          ),
          checkbox: (
            <div>
              <GetComponent current={curr} type={ComponentType.POSITION} />
              <GetComponent current={curr} type={ComponentType.BORDER} />
              <GetComponent current={curr} type={ComponentType.CHECKBOX} />
            </div>
          ),
          'sl-input': (
            <div>
              <GetComponent current={curr} type={ComponentType.POSITION} />
              <GetComponent current={curr} type={ComponentType.SIZE} />
              <GetComponent current={curr} type={ComponentType.BORDER} />
              <GetComponent current={curr} type={ComponentType.TEXT} />
            </div>
          ),
          'ml-input': (
            <div>
              <GetComponent current={curr} type={ComponentType.POSITION} />
              <GetComponent current={curr} type={ComponentType.SIZE} />
              <GetComponent current={curr} type={ComponentType.BORDER} />
              <GetComponent current={curr} type={ComponentType.TEXT} />
            </div>
          ),
        }[type]
      }
    </div>
  );
}
