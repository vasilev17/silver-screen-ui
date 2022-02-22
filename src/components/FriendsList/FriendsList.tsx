import React, { FC } from 'react';
import styles from './FriendsList.module.scss';

interface FriendsListProps {}

const FriendsList: FC<FriendsListProps> = () => (
  <div className={styles.FriendsList}>
    FriendsList Component
  </div>
);

export default FriendsList;
