import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Editor from '../components/editor/editor';
import { landingURL } from '../config/config';
import Cover from '../cover';
import { ResponseProps } from '../data';
import ResponsePage from './ResponsePage';
import api from '../config/api';
import { setProjectData } from '../components/system/reduxSlice/projectSlice';
import { setWindowData } from '../components/system/reduxSlice/windowSlice';
import { RootState } from '../store';
import {
  resetData,
  setAssetData,
} from '../components/system/reduxSlice/assetSlice';
import { setScriptContext } from '..';

export default function EditorPage() {
  const { projectID } = useParams();

  const setScripts = useContext(setScriptContext);

  const doProjectSetup = useSelector(
    (state: RootState) => state.project.doSetup
  );
  const scriptSaved = useSelector(
    (state: RootState) => state.window.scriptSaved
  );

  const doWindowSetup = useSelector((state: RootState) => state.window.doSetup);

  const [props, setProps] = useState<ResponseProps>({
    status: undefined,
    message: undefined,
  });

  const dispatch = useDispatch();

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

    if (!localStorage.getItem('id') || !localStorage.getItem('nickname')) {
      window.location.href = landingURL;
    }

    (async () => {
      await api
        .get(`/project/${localStorage.getItem('id')}/${projectID}`)
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
          setProps({
            status: err.response.status,
            message: err.response.data.message,
          });
        });
    })();

    return () => {
      dispatch(resetData());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectID]);

  return doProjectSetup && doWindowSetup ? (
    <div className="EditorPage">
      <Cover />
      <Editor />
    </div>
  ) : (
    <ResponsePage {...props} />
  );
}
