import { useEffect, useState } from 'react';
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

export default function EditorPage() {
  const { projectID } = useParams();
  const doProjectSetup = useSelector(
    (state: RootState) => state.project.doSetup
  );
  const doWindowSetup = useSelector((state: RootState) => state.window.doSetup);

  const [props, setProps] = useState<ResponseProps>({
    status: undefined,
    message: undefined,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Editor - Selenod';

    if (!localStorage.getItem('id') || !localStorage.getItem('nickname')) {
      window.location.href = landingURL;
    }

    (async () => {
      await api
        .get(`/project/${localStorage.getItem('id')}/${projectID}`)
        .then((res) => {
          document.title = `${res.data.project.name} - Editor - Selenod`;
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
