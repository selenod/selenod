import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Editor from '../components/editor/editor';
import Cover from '../cover';
import { ResponseProps } from '../data';
import ResponsePage from './ResponsePage';
import api from '../config/api';
import { setProjectData } from '../components/system/reduxSlice/projectSlice';
import {
  setScriptSaved,
  setWindowData,
} from '../components/system/reduxSlice/windowSlice';
import { RootState } from '../store';
import {
  resetData,
  setAssetData,
} from '../components/system/reduxSlice/assetSlice';
import {
  dataContext,
  scriptContext,
  setDataContext,
  setScriptContext,
} from '..';
import toast from 'react-hot-toast';
import { landingURL } from '../config/config';

export default function EditorPage() {
  const { projectID } = useParams();

  const scripts = useContext(scriptContext);
  const setScripts = useContext(setScriptContext);
  const data = useContext(dataContext);
  const setData = useContext(setDataContext);

  const doProjectSetup = useSelector(
    (state: RootState) => state.project.doSetup
  );
  const scriptSaved = useSelector(
    (state: RootState) => state.window.scriptSaved
  );
  const projectData = useSelector((state: RootState) => state.project.data);
  const currentWindow = useSelector(
    (state: RootState) => state.window.currentWindow
  );
  const doWindowSetup = useSelector((state: RootState) => state.window.doSetup);

  const [props, setProps] = useState<ResponseProps>({
    status: undefined,
    message: undefined,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem('delay')) {
      localStorage.setItem('delay', '300');
    }

    const autoSaveInterval = setInterval(() => {
      if (!scriptSaved) {
        (async () => {
          await api
            .put('/project/script', {
              uid: data?.uid,
              id: projectData.id,
              windowId: currentWindow,
              scriptData: scripts.find(
                (script) => script.windowId === currentWindow
              )?.script,
            })
            .then(() => {
              dispatch(setScriptSaved(true));
            })
            .catch(() => {
              toast.error('Fail to auto-update database.');
            });
        })();
      }
    }, 1000 * (parseInt(localStorage.getItem('delay')!) < 10 ? 10 : parseInt(localStorage.getItem('delay')!) > 600 ? 600 : parseInt(localStorage.getItem('delay')!)));

    return () => clearInterval(autoSaveInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWindow, dispatch, projectData.id, scriptSaved, scripts]);

  useEffect(() => {
    const handleUnload = (event: BeforeUnloadEvent) => {
      if (!scriptSaved) {
        event.preventDefault();
        event.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [scriptSaved]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Selenod Editor';

    if (!data?.uid || !data?.uname) {
      if (sessionStorage.getItem('uid') && sessionStorage.getItem('uname')) {
        setData!({
          uid: sessionStorage.getItem('uid')!,
          uname: sessionStorage.getItem('uname')!,
        });
      } else {
        window.location.replace(landingURL);
      }
    } else {
      (async () => {
        await api
          .get(`/project/${data?.uid}/${projectID}`)
          .then((res) => {
            document.title = `${res.data.project.name} - Selenod Editor`;

            res.data.project.windowList.forEach((win: any) => {
              Object.keys(win.scriptData.data).forEach((key) => {
                delete win.scriptData.data[key]._id;
                if (!win.scriptData.data[key].outputFlowConnection) {
                  win.scriptData.data[key].outputFlowConnection = null;
                }

                win.scriptData.data[key].inputConnections.forEach(
                  (connection: any) => {
                    delete connection._id;
                    if (!connection.connection) {
                      connection.connection = null;
                    }
                  }
                );
              });
              // delete win.scriptData.data._id;
            });

            setScripts!(
              res.data.project.windowList.map((win: any) => ({
                windowId: win.id,
                script: win.scriptData.data,
              }))
            );

            // Delete scriptData of window for dispatch setWindowData.
            res.data.project.windowList.forEach(
              (win: any) => delete win.scriptData
            );

            dispatch(
              setAssetData({
                assetList: res.data.project.assetList,
                assetData: res.data.project.assetData,
                assetLength: res.data.project.assetLength,
              })
            );
            dispatch(
              setWindowData({
                windowList: res.data.project.windowList,
                currentWindow: res.data.project.windowList[0].id,
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
            console.log(err);

            setProps({
              status: err.response.status,
              message: err.response.data.message,
            });
          });
      })();
    }

    return () => {
      dispatch(resetData());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectID, data]);

  return doProjectSetup && doWindowSetup ? (
    <div className="EditorPage">
      <Cover />
      <Editor />
    </div>
  ) : (
    <ResponsePage {...props} />
  );
}
