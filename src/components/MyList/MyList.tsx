import React, { FC } from 'react';
import styles from './MyList.module.scss';

interface MyListProps {}

const MyList: FC<MyListProps> = () => (
  <div className={styles.MyList}>
    MyList Component
  </div>
);

export default MyList;
