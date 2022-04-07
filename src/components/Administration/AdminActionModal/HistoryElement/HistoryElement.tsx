import React, { FC } from 'react';
import styles from './HistoryElement.module.scss';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import GavelIcon from '@mui/icons-material/Gavel';

interface HistoryElementProps {
  severity: string,
  content: string,
  banDate?: string,
}

const HistoryElement: FC<HistoryElementProps> = (props) => (
  <div className={styles.HistoryElement} style={props.severity === 'ban' ? { background: '#ff2d2d9e' } : { background: '#ff9900a1' }}>
    <div style={{display: 'flex'}}>
      <div style={{alignSelf: 'center', padding: '0.4rem'}}>
        {props.severity === 'ban' ? 
          <GavelIcon sx={{fontSize:'2.5rem'}}/>
          : 
          <WarningAmberIcon sx={{fontSize:'2.5rem'}}/>
        }
      </div>
      <div style={{padding: '0.5rem'}}>{props.content}</div>
    </div>
    <div>
      {props.banDate !== null ? 
        <div style={{marginLeft: '0.3rem', marginBottom: '0.2rem'}}>
          Banned until {props.banDate}
        </div> 
      : null}
    </div>
  </div>
);

export default HistoryElement;
