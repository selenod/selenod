import './styles/field.css';

import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { imageExtensions, videoExtensions } from '../../data';

interface IToolData {
  panelWidth: number;
}

export default function Field(data: IToolData) {
  const currentOpenedPanel = useSelector(
    (state: RootState) => state.asset.currentOpenedPanel
  );
  const assetData = useSelector((state: RootState) => state.asset.assetData);
  const toggle = useSelector((state: RootState) => state.window.toggle);
  const windowList = useSelector((state: RootState) => state.window.windowList);
  const currentWindow = useSelector(
    (state: RootState) => state.window.currentWindow
  );

  return (
    <div
      className="Field"
      style={{
        width: `calc(100% - ${data.panelWidth}px - 70px)`,
        marginLeft: data.panelWidth + 70,
      }}
    >
      {toggle === 0 ? (
        <div
          style={{
            position: 'relative',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width:
              windowList.find((window) => window.id === currentWindow)
                ?.windowData.width! / 1.5,
            height:
              windowList.find((window) => window.id === currentWindow)
                ?.windowData.height! / 1.5,
            backgroundColor: 'red',
          }}
        >
          {
            windowList.find((window) => window.id === currentWindow)?.windowData
              .width!
          }
          x
          {
            windowList.find((window) => window.id === currentWindow)?.windowData
              .height!
          }
        </div>
      ) : toggle === 1 ? (
        <div>Script Panel</div>
      ) : assetData.find((asset) => asset.id === currentOpenedPanel)
          ?.extension !== undefined &&
        imageExtensions.includes(
          assetData
            .find((asset) => asset.id === currentOpenedPanel)
            ?.extension!.substr(1)!
        ) ? (
        <img
          src={
            assetData.find((asset) => asset.id === currentOpenedPanel)?.contents
          }
          alt={
            assetData.find((asset) => asset.id === currentOpenedPanel)?.name! +
            assetData.find((asset) => asset.id === currentOpenedPanel)
              ?.extension!
          }
          style={{
            position: 'relative',
            maxWidth: 512,
            maxHeight: 512,
            marginTop: '1rem',
            left: '50%',
            transform: 'translateX(-50%)',
            borderRadius: 7,
          }}
        />
      ) : assetData.find((asset) => asset.id === currentOpenedPanel)
          ?.extension !== undefined &&
        videoExtensions.includes(
          assetData
            .find((asset) => asset.id === currentOpenedPanel)
            ?.extension!.substr(1)!
        ) ? (
        <video
          controls
          style={{
            position: 'relative',
            maxWidth: 512,
            maxHeight: 512,
            marginTop: '1rem',
            left: '50%',
            transform: 'translateX(-50%)',
            borderRadius: 7,
          }}
        >
          <source
            src={
              assetData.find((asset) => asset.id === currentOpenedPanel)
                ?.contents
            }
          />
        </video>
      ) : (
        <pre
          style={{
            position: 'relative',
            left: 20,
            color: 'var(--fieldTextColor)',
            fontSize: '1.05rem',
            textAlign: 'left',
            width: 'calc(100% - 30px)',
          }}
        >
          {currentOpenedPanel === null
            ? null
            : assetData.find((asset) => asset.id === currentOpenedPanel)
                ?.contents}
        </pre>
      )}
    </div>
  );
}
