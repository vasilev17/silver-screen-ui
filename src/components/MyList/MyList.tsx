import { Box, Tab, Tabs } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import React, { FC, useEffect } from 'react';
import styles from './MyList.module.scss';
import MovieRow from '../MovieRow/MovieRow';

export default function MyList() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  document.title = `Silver Screen - My List`;

  return (
    <Box sx={{ width: '100%', typography: 'body1', marginTop: '70px' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Watchlist" value="1" />
            <Tab label="Completed" value="2" />
          </TabList>
        </Box>
        <TabPanel className={styles.movieRowContainer} value="1">
          <MovieRow myListIsWatched={false} showGenreTittle={false}/>
          </TabPanel>


        <TabPanel className={styles.movieRowContainer} value="2">
        <MovieRow myListIsWatched={true} showGenreTittle={false}/>
        </TabPanel>

      </TabContext>
    </Box>
  );
}
