import React, { FC } from 'react';
import styles from './AdministrationPage.module.scss';

interface AdministrationPageProps {}

const AdministrationPage: FC<AdministrationPageProps> = () => (
  <div className={styles.AdministrationPage}>
    AdministrationPage Component
  </div>
);

export default AdministrationPage;
