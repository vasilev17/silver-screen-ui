import React, { FC, useEffect } from 'react';
import styles from './PageNotFound.module.scss';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';

interface PageNotFoundProps { }

const PageNotFound: FC<PageNotFoundProps> = () => {

  useEffect(() => {
    var navbar = document.getElementById('mainNavbar');
    navbar.hidden = true;
  }, [])

  return (
    <div className={styles.pageNotFound} style={{ textAlign: 'center' }}>
      <div>
        <ErrorOutlineRoundedIcon className={styles.icon} sx={{ width: '5rem', height: '5rem' }} />
      </div>
      <div className={styles.textUnder}>
        Error 404: Page Not Found
      </div>

      <div className={styles.border} />

      <div className={styles.textUnderBorder}>
        This page does not seem to exist. Please return to the <a className={styles.mainPageLink} href={'/'}>main webpage</a>
      </div>



    </div>
  );
};

export default PageNotFound;
