import { useContext, useEffect, useState } from 'react';
import { appURL, landingURL } from '../config/config';
import Modal from 'react-modal';
import toast from 'react-hot-toast';
import Footer from '../components/system/footer';
import { ResponseProps } from '../data';
import ResponsePage from './ResponsePage';
import api from '../config/api';
import { dataContext, setDataContext } from '..';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function Workspace() {
  const { t } = useTranslation(['page']);

  const [winOpenId, setWinOpenId] = useState<number | string>();
  const [formInput, setFormInput] = useState<string>('');
  const [formDisable, setFormDisable] = useState<boolean>(false);
  const [props, setProps] = useState<ResponseProps>({
    status: undefined,
    message: undefined,
  });
  const [projectList, setProjectList] = useState<Array<any>>();

  const data = useContext(dataContext);
  const setData = useContext(setDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Workspace - Selenod';

    if (!data?.uid || !data?.uname) {
      if (sessionStorage.getItem('token')) {
        (async () => {
          await api
            .get(`/user/${sessionStorage.getItem('token')}`)
            .then((res) => {
              setData!({
                uid: res.data.uid,
                uname: res.data.username,
              });
            })
            .catch((err) => {
              setProps({
                status: err.response.status,
                message: err.response.data.message,
              });
            });
        })();
      } else {
        window.location.replace(landingURL);
      }
    } else {
      (async () => {
        await api
          .get(`/user/projects/${data?.uid}`)
          .then((res) => {
            setProjectList(res.data.projectList);
          })
          .catch((err) => {
            setProps({
              status: err.response.status,
              message: err.response.data.message,
            });
          });
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return projectList ? (
    <div
      style={{
        width: '100%',
      }}
    >
      <div
        style={{
          width: '100%',
          height: projectList.length * 80 + 340,
          minHeight: '50rem',
          marginTop: 64,
          backgroundColor: 'var(--panelColor)',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: 1060,
            height: 'calc(100% - 200px)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div
            style={{
              width: '100%',
              height: 40,
            }}
          >
            <p
              style={{
                position: 'relative',
                top: '50%',
                transform: 'translateY(-50%)',
                float: 'left',
                fontWeight: 800,
                fontSize: '1.5rem',
                color: 'var(--textBlackColor)',
              }}
            >
              {t('writ96')}
            </p>
            <div
              className="button primary"
              style={{
                textAlign: 'center',
                float: 'right',
              }}
              onClick={() => setWinOpenId(0)}
            >
              <p
                style={{
                  position: 'relative',
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              >
                {t('writ97')}
              </p>
            </div>
            <Modal
              closeTimeoutMS={150}
              isOpen={winOpenId === 0}
              contentLabel={t('writ98')}
              style={{
                content: {
                  width: '400px',
                },
              }}
            >
              <div className="header">
                <p>{t('writ98')}</p>
                <div
                  title={t('cancel')}
                  onClick={() => setWinOpenId(undefined)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="27"
                    height="27"
                    fill="var(--shortcutIconColor)"
                    className="bi bi-x"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                  </svg>
                </div>
              </div>
              <div className="body">
                <div
                  style={{
                    position: 'relative',
                    top: 20,
                    left: '50%',
                    transform: 'translateX(-50%)',
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      color: 'var(--textSubBlackColor)',
                      paddingBottom: '.7rem',
                    }}
                  >
                    {t('writ99')}
                  </p>
                  <input
                    style={{
                      width: '100%',
                      margin: '0 0 1rem 0',
                      fontSize: '.9rem',
                    }}
                    onChange={(e) => {
                      setFormInput(e.target.value);
                    }}
                    maxLength={50}
                  />
                  <button
                    className="button primary"
                    style={{
                      display: 'inherit',
                      marginLeft: 'auto',
                      marginBottom: 40,
                    }}
                    disabled={formDisable}
                    onClick={() => {
                      // two-factor
                      setFormDisable(true);

                      if (formInput.replaceAll(' ', '') !== '') {
                        (async () => {
                          await api
                            .post('/project', {
                              name: formInput,
                              uid: data?.uid,
                            })
                            .then(() => {
                              api
                                .get(`/user/projects/${data?.uid}`)
                                .then((res) => {
                                  setProjectList(res.data.projectList);
                                  toast.success(t('writ100'));
                                })
                                .catch((err) => {
                                  toast.error(err.response.data.message);
                                });
                            })
                            .catch((err) => {
                              toast.error(err.response.data.message);
                            });
                        })();
                      } else if (formInput.replaceAll(' ', '') === '') {
                        toast.error(t('writ101'));
                      } else {
                        toast.error('An error occured.');
                      }
                      setWinOpenId(undefined);
                      setFormDisable(false);
                      setFormInput('');
                    }}
                  >
                    {t('writ102')}
                  </button>
                </div>
              </div>
            </Modal>
          </div>
          <div
            style={{
              width: '100%',
              height: 50,
              marginTop: 40,
              borderBottom: '1px solid var(--lineColor)',
            }}
          >
            <div
              style={{
                height: '100%',
                width: 250,
                float: 'left',
                marginLeft: 50,
              }}
            >
              <p
                style={{
                  position: 'relative',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  textAlign: 'left',
                  color: 'var(--shortcutIconColor)',
                }}
              >
                {t('writ103')}
              </p>
            </div>
            <div
              style={{
                height: '100%',
                width: 200,
                float: 'left',
                marginLeft: 50,
              }}
            >
              <p
                style={{
                  position: 'relative',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  textAlign: 'left',
                  color: 'var(--shortcutIconColor)',
                }}
              >
                {t('writ104')}
              </p>
            </div>
            <div
              style={{
                height: '100%',
                width: 200,
                float: 'left',
                marginLeft: 50,
              }}
            >
              <p
                style={{
                  position: 'relative',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  textAlign: 'left',
                  color: 'var(--shortcutIconColor)',
                }}
              >
                {t('writ105')}
              </p>
            </div>
          </div>
          <div
            style={{
              position: 'relative',
              width: '100%',
              minHeight: 450,
              marginTop: 10,
              overflow: 'auto',
            }}
          >
            {/* render project-stacks by using map() */}
            {projectList.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  fontSize: '1.25rem',
                  fontWeight: 500,
                  color: 'var(--textGrayColor)',
                  marginTop: 50,
                }}
              >
                {t('writ106')}
                <br />
                {t('writ107')}
              </div>
            ) : (
              projectList.map((project, index) => (
                <div className="project-stack" key={index}>
                  <div
                    style={{
                      marginLeft: 50,
                      width: 250,
                      height: '100%',
                      float: 'left',
                    }}
                  >
                    <p
                      className="name"
                      style={{
                        position: 'relative',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontWeight: 600,
                        color: 'var(--textSubBlackColor)',
                        textAlign: 'left',
                        maxWidth: '100%',
                        fontSize: '1.1rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                      onClick={() => {
                        navigate(`/editor/${project._id}`);
                      }}
                    >
                      {project.name}
                    </p>
                  </div>
                  <div
                    style={{
                      marginLeft: 50,
                      width: 200,
                      height: '100%',
                      float: 'left',
                    }}
                  >
                    <p
                      style={{
                        position: 'relative',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontWeight: 500,
                        color: 'var(--textGrayColor)',
                        textAlign: 'left',
                        maxWidth: '100%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {new Date(project.createAt).toLocaleDateString('sv', {
                        timeZone:
                          Intl.DateTimeFormat().resolvedOptions().timeZone,
                      })}
                    </p>
                  </div>
                  <div
                    style={{
                      marginLeft: 50,
                      width: 200,
                      height: '100%',
                      float: 'left',
                    }}
                  >
                    <p
                      style={{
                        position: 'relative',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontWeight: 500,
                        color: 'var(--textGrayColor)',
                        textAlign: 'left',
                        maxWidth: '100%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {new Date(project.modifiedAt).toLocaleDateString('sv', {
                        timeZone:
                          Intl.DateTimeFormat().resolvedOptions().timeZone,
                      })}
                    </p>
                  </div>
                  <div title={t('writ108')}>
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 25 25"
                      fill="var(--textGrayColor)"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        position: 'relative',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        float: 'right',
                        marginRight: 50,
                        cursor: 'pointer',
                      }}
                      onClick={() => setWinOpenId(project._id)}
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.25 2.5C11.0179 2.50012 10.7905 2.56485 10.5931 2.68694C10.3957 2.80903 10.2362 2.98365 10.1325 3.19125L9.2275 5H5C4.66848 5 4.35054 5.1317 4.11612 5.36612C3.8817 5.60054 3.75 5.91848 3.75 6.25C3.75 6.58152 3.8817 6.89946 4.11612 7.13388C4.35054 7.3683 4.66848 7.5 5 7.5V20C5 20.663 5.26339 21.2989 5.73223 21.7678C6.20107 22.2366 6.83696 22.5 7.5 22.5H17.5C18.163 22.5 18.7989 22.2366 19.2678 21.7678C19.7366 21.2989 20 20.663 20 20V7.5C20.3315 7.5 20.6495 7.3683 20.8839 7.13388C21.1183 6.89946 21.25 6.58152 21.25 6.25C21.25 5.91848 21.1183 5.60054 20.8839 5.36612C20.6495 5.1317 20.3315 5 20 5H15.7725L14.8675 3.19125C14.7638 2.98365 14.6043 2.80903 14.4069 2.68694C14.2095 2.56485 13.9821 2.50012 13.75 2.5H11.25ZM8.75 10C8.75 9.66848 8.8817 9.35054 9.11612 9.11612C9.35054 8.8817 9.66848 8.75 10 8.75C10.3315 8.75 10.6495 8.8817 10.8839 9.11612C11.1183 9.35054 11.25 9.66848 11.25 10V17.5C11.25 17.8315 11.1183 18.1495 10.8839 18.3839C10.6495 18.6183 10.3315 18.75 10 18.75C9.66848 18.75 9.35054 18.6183 9.11612 18.3839C8.8817 18.1495 8.75 17.8315 8.75 17.5V10ZM15 8.75C14.6685 8.75 14.3505 8.8817 14.1161 9.11612C13.8817 9.35054 13.75 9.66848 13.75 10V17.5C13.75 17.8315 13.8817 18.1495 14.1161 18.3839C14.3505 18.6183 14.6685 18.75 15 18.75C15.3315 18.75 15.6495 18.6183 15.8839 18.3839C16.1183 18.1495 16.25 17.8315 16.25 17.5V10C16.25 9.66848 16.1183 9.35054 15.8839 9.11612C15.6495 8.8817 15.3315 8.75 15 8.75Z"
                      />
                    </svg>
                  </div>
                  <div title={t('writ120')}>
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 20 20"
                      fill="var(--textGrayColor)"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        position: 'relative',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        float: 'right',
                        marginRight: 18,
                        cursor: 'pointer',
                      }}
                      onClick={() => window.open(`${appURL}${project.route}`)}
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
                      />
                    </svg>
                  </div>
                  <Modal
                    closeTimeoutMS={150}
                    isOpen={winOpenId === project._id}
                    contentLabel={t('writ108')}
                    style={{
                      content: {
                        width: '450px',
                      },
                    }}
                  >
                    <div className="header">
                      <p>{t('writ108')}</p>
                      <div
                        title={t('cancel')}
                        onClick={() => setWinOpenId(undefined)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="27"
                          height="27"
                          fill="var(--shortcutIconColor)"
                          className="bi bi-x"
                          viewBox="0 0 16 16"
                        >
                          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                      </div>
                    </div>
                    <div className="body">
                      <div
                        style={{
                          position: 'relative',
                          top: 20,
                          left: '50%',
                          transform: 'translateX(-50%)',
                        }}
                      >
                        <p
                          style={{
                            margin: 0,
                            color: 'var(--textSubBlackColor)',
                            paddingBottom: '1rem',
                            maxWidth: '100%',
                            lineHeight: '1.5',
                          }}
                        >
                          {t('writ70')}
                          <br />
                          {t('writ109')}
                        </p>
                        <button
                          className="button danger"
                          style={{
                            display: 'inherit',
                            marginLeft: 'auto',
                            marginTop: 15,
                            marginBottom: 40,
                          }}
                          onClick={async () => {
                            // two-factor (who knows?)
                            setFormDisable(true);

                            await api
                              .delete(`/project/${data?.uid}/${project._id}`)
                              .then(() => {
                                api
                                  .get(`/user/projects/${data?.uid}`)
                                  .then((res) => {
                                    toast.success(t('writ110'));
                                    setProjectList(res.data.projectList);
                                  })
                                  .catch((err) => {
                                    toast.error(
                                      err.response.data.message.message
                                    );
                                  });
                              })
                              .catch((err) => {
                                toast.error(err.response.data.message);
                              });
                            setWinOpenId(undefined);
                            setFormDisable(false);
                            setFormInput('');
                          }}
                          disabled={formDisable}
                        >
                          {t('writ74')}
                        </button>
                      </div>
                    </div>
                  </Modal>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <ResponsePage {...props} />
  );
}
