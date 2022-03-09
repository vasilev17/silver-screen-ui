import React, { FC } from 'react';
import AdminWindowComponent from '../AdminWindowComponent/AdminWindowComponent';
import styles from './CommentManagement.module.scss';

interface CommentManagementProps {}

const CommentManagement: FC<CommentManagementProps> = () => (
  <div className={styles.CommentManagement}>
    <AdminWindowComponent title={"Comment moderation"} iconSet={2} height={'17rem'} padding={'1rem'}> 

    </AdminWindowComponent>
  </div>
);

export default CommentManagement;
