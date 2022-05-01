import './styles/field.css';

import { RootState } from '../../store';
import { useSelector, useDispatch } from 'react-redux';

interface IToolData {
  panelWidth: number;
}

export default function Field(data: IToolData) {
  const dispatch = useDispatch();
  const currentOpenedPanel = useSelector(
    (state: RootState) => state.asset.currentOpenedPanel
  );
  const assetData = useSelector((state: RootState) => state.asset.assetData);

  return (
    <div
      className="Field"
      style={{
        position: 'relative',
        width: `calc(100% - ${data.panelWidth}px - 70px)`,
        marginLeft: data.panelWidth + 70,
      }}
    >
      <pre
        style={{
          position: 'relative',
          top: 20,
          left: 30,
          color: 'var(--textSubBlackColor)',
          fontSize: '1.1rem',
          textAlign: 'left',
          width: 'calc(100% - 30px)',
        }}
      >
        {currentOpenedPanel === null
          ? null
          : assetData.find((asset) => asset.id === currentOpenedPanel)
              ?.contents}
      </pre>
    </div>
  );
}
