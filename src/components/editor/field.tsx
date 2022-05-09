import './styles/field.css';

import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { imageExtensions } from '../../data';

interface IToolData {
  panelWidth: number;
}

export default function Field(data: IToolData) {
  const currentOpenedPanel = useSelector(
    (state: RootState) => state.asset.currentOpenedPanel
  );
  const assetData = useSelector((state: RootState) => state.asset.assetData);

  return (
    <div
      className="Field"
      style={{
        width: `calc(100% - ${data.panelWidth}px - 70px)`,
        marginLeft: data.panelWidth + 70,
      }}
    >
      {assetData.find((asset) => asset.id === currentOpenedPanel)?.extension !==
        undefined &&
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
          }}
        />
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
