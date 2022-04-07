import React, { FC } from 'react';
import styles from './AdminWindowComponent.module.scss';
import QueuePlayNextIcon from '@mui/icons-material/QueuePlayNext';
import GavelIcon from '@mui/icons-material/Gavel';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import InsertChartIcon from '@mui/icons-material/InsertChart';

interface AdminWindowComponentProps {
  title:string,
  iconSet:number,
  padding,
  height,
}

const AdminWindowComponent: FC<AdminWindowComponentProps> = (winInfo) => {

  function DisplayIcon(){
    switch(winInfo.iconSet){
      case 1: 
        return(
          <QueuePlayNextIcon style={{width: '2rem', height: '2rem'}}/>
        );
      case 2: 
        return(
          <GavelIcon style={{width: '2rem', height: '2rem'}}/>
        );
      case 3: 
        return(
          <DoDisturbIcon style={{width: '2rem', height: '2rem'}}/>
        );
      case 4: 
        return(
          <AdminPanelSettingsOutlinedIcon style={{width: '2rem', height: '2rem'}}/>
        );
      case 5:
        return(
          <InsertChartIcon style={{width: '2rem', height: '2rem'}}/>
        );
    }
  }

  return(
  <div className={styles.AdminWindowComponent} style={{height: winInfo.height}}>
    <div className={styles.AdminWindowComponent_banner}>
      <div className={styles.AdminWindowComponent_banner_title}>{winInfo.title}</div>
      <div className={styles.AdminWindowComponent_banner_icon}>{DisplayIcon()}</div>
    </div>
    <div style={{padding: winInfo.padding}}>
      {winInfo.children}
    </div>
  </div>
  );
}

export default AdminWindowComponent;
