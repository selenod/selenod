import './styles/footer.css';
import logo from '../../assets/svgs/logo.svg';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { landingURL } from '../../config/config';

export default function Footer() {
  const { t } = useTranslation(['page']);

  return (
    <div className="Footer">
      <div className="preset">
        <div>
          <div className="part-up">
            <div className="section">
              <img src={logo} alt="" />
              <div>
                <a href="https://www.privacypolicygenerator.info/live.php?token=ebG79IWXMB6odM7Ga4FZXe8HV3H9NWQp">
                  <p>{t('privacy_policy')}</p>
                </a>
              </div>
            </div>
            <div className="section">
              <p className="rep">{t('learn_more')}</p>
              <div>
                <a href="https://github.com/selenod/support/issues/new">
                  <p>{t('support')}</p>
                </a>
                <a href={landingURL + '/developers'}>
                  <p>{t('developers')}</p>
                </a>
              </div>
            </div>
            <div
              className="button"
              onClick={() =>
                window.open('https://github.com/selenod', '_blank')
              }
            >
              <svg fill="#8166cc" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
            </div>
          </div>
          <div className="part-down">
            <p>© 2022 Selenod. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
