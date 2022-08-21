import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Editor from '../components/editor/editor';
import { landingURL } from '../config/config';
import Cover from '../cover';
import { ResponseProps } from '../data';
import ResponsePage from './ResponsePage';
import api from '../config/api';

export default function EditorPage() {
  const { projectID } = useParams();

  const [props, setProps] = useState<ResponseProps>({
    status: undefined,
    message: undefined,
  });
  const [project, setProject] = useState<any>();

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
          setProject(res.data.project);
        })
        .catch((err) => {
          setProps({
            status: err.response.status,
            message: err.response.data.message.message,
          });
        });
    })();
  }, [projectID]);

  return project ? (
    <div className="EditorPage">
      <Cover />
      <Editor />
    </div>
  ) : (
    <ResponsePage {...props} />
  );
}
