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
                ?.windowData.height! /
                1.5 +
              35,
            backgroundColor: 'white',
            borderRadius: 10,
            boxShadow: '0px 1px 40px 0px #00000005',
          }}
        >
          <div
            style={{
              width: '100%',
              height: 35,
              borderRadius: '10px 10px 0 0',
              backgroundColor: '#8052ff',
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="#fff"
              style={{
                position: 'relative',
                top: '50%',
                transform: 'translateY(-50%)',
                float: 'left',
                left: 10,
              }}
            >
              <path
                fill-Rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                clipRule="evenodd"
              />
            </svg>
            <p
              style={{
                position: 'relative',
                top: 'calc(50% - .5px)',
                transform: 'translateY(-50%)',
                float: 'left',
                color: '#fff',
                fontSize: '.9rem',
                left: 17,
                fontWeight: 500,
                maxWidth: 'calc(100% - 170px)',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
            >
              {windowList.find((window) => window.id === currentWindow)?.name}
            </p>
            <svg
              width="10"
              height="10"
              fill="#fff"
              viewBox="0 0 10 10"
              style={{
                position: 'relative',
                top: '50%',
                transform: 'translateY(-50%)',
                float: 'right',
                right: 20,
              }}
            >
              <polygon points="10.2,0.7 9.5,0 5.1,4.4 0.7,0 0,0.7 4.4,5.1 0,9.5 0.7,10.2 5.1,5.8 9.5,10.2 10.2,9.5 5.8,5.1" />
            </svg>
            <svg
              width="10"
              height="10"
              fill="#fff"
              viewBox="0 0 10 10"
              style={{
                position: 'relative',
                top: '50%',
                transform: 'translateY(-50%)',
                float: 'right',
                right: 50,
              }}
            >
              <path d="M0,0v10h10V0H0z M9,9H1V1h8V9z" />
            </svg>
            <svg
              width="10"
              height="10"
              fill="#fff"
              x="0px"
              y="0px"
              viewBox="0 0 10.2 1"
              style={{
                position: 'relative',
                top: '50%',
                transform: 'translateY(-50%)',
                float: 'right',
                right: 80,
              }}
            >
              <rect x="0" y="50%" width="10.2" height="1" />
            </svg>
          </div>
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
