import React, { FC } from 'react';
import styles from './AddFriend.module.scss';

interface AddFriendProps {}

const AddFriend: FC<AddFriendProps> = () => (
  <div className={styles.AddFriend}>
    AddFriend Component
  </div>
);

export default AddFriend;
