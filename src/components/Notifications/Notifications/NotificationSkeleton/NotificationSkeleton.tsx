import { Skeleton } from '@mui/material';
import React, { FC } from 'react';
import styles from './NotificationSkeleton.module.scss';

interface NotificationSkeletonProps {}

const NotificationSkeleton: FC<NotificationSkeletonProps> = () => (
  <div>
    <div style={{padding: '4%', display: 'flex', backgroundColor: "#2c2c2c52"}}>
      <Skeleton variant="circular" animation="wave" width={40} height={40} style={{marginRight: '4%'}} />
      <Skeleton variant="text" animation="wave" width={210} height={15} />
      <Skeleton variant="text" animation="wave" width={244} height={15} style={{
        marginTop: '5.2%',
        marginLeft: '-72%',
        }}/>
        <Skeleton variant="text" animation="wave" width={244} height={15} style={{
        marginTop: '10%',
        marginLeft: '-83%',
        }}/>
    </div>
    <div style={{borderBottom: 'solid 1.5px #c9c9c98c'}}/>
  </div>
);

export default NotificationSkeleton;
