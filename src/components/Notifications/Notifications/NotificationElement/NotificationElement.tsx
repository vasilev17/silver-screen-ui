import React, { FC } from 'react';
import styles from './NotificationElement.module.scss';

interface NotificationElementProps {
  ID:number,
  Author:{
    avatar:string,
    id:number,
    username:string
  }
  Type:string,
  Content:string,
  MovieID?:number,
  Active:boolean,  
}

const NotificationElement: FC<NotificationElementProps> = (notificationInfo) => (
  <div>
    ID: { notificationInfo.ID}
    <br/>
    User: {notificationInfo.Author.username} [ID: {notificationInfo.Author.id}]
    <br/>
    User Avatar: {notificationInfo.Author.avatar}
    <br/>
    Type: {notificationInfo.Type}
    <br/>
    MovieID: {notificationInfo.MovieID}
    <br/> 
    Contents: {notificationInfo.Content}
    <br/> 
    Active: {notificationInfo.Active}
    <div style={{borderBottom: 'solid 1.5px #c9c9c98c'}}/>
  </div>
);

export default NotificationElement;
