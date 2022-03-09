import React, { FC } from 'react';
import AdminWindowComponent from '../AdminWindowComponent/AdminWindowComponent';
import styles from './UserManagement.module.scss';

interface UserManagementProps {}

const UserManagement: FC<UserManagementProps> = () => (
  <div className={styles.UserManagement}>
    <AdminWindowComponent title={"Misbehaving users:"} iconSet={2} height={'17rem'} padding={'1rem'}> 

    </AdminWindowComponent>
    <br/>
    <AdminWindowComponent title={"Banned users:"} iconSet={3} height={'17rem'} padding={'1rem'}> 

    </AdminWindowComponent>
    <br/>
    <AdminWindowComponent title={"Administrators:"} iconSet={4} height={'17rem'} padding={'1rem'}> 

    </AdminWindowComponent>
  </div>
);

export default UserManagement;
