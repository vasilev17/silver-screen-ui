import React, { FC } from 'react';
import AdminWindowComponent from '../AdminWindowComponent/AdminWindowComponent';
import AdminGrantRevokeW from './AdminGrantRevokeW/AdminGrantRevokeW';
import BannedUsersW from './BannedUsersW/BannedUsersW';
import MisbehavingUsersW from './MisbehavingUsersW/MisbehavingUsersW';
import styles from './UserManagement.module.scss';

interface UserManagementProps {}

const UserManagement: FC<UserManagementProps> = () => (
  <div className={styles.UserManagement}>
    <AdminWindowComponent title={"User statistics:"} iconSet={5} height={'21.5rem'} padding={'1rem'}> 
      <MisbehavingUsersW/>
    </AdminWindowComponent>
    <br/>
    <AdminWindowComponent title={"Banned users:"} iconSet={3} height={'21.5rem'} padding={'1rem'}> 
      <BannedUsersW/>
    </AdminWindowComponent>
    <br/>
    <AdminWindowComponent title={"Administrators:"} iconSet={4} height={'21.5rem'} padding={'1rem'}> 
      <AdminGrantRevokeW/>
    </AdminWindowComponent>
    <br/>
  </div>
);

export default UserManagement;
