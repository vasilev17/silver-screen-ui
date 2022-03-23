import { SignalCellularConnectedNoInternet1Bar } from '@mui/icons-material';
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import styles from './FriendList.module.scss';

interface FriendListProps { }

const FriendList: FC<FriendListProps> = () => {

  const [username, setUsername] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [code, setCode] = useState(<></>);
  var token = localStorage.getItem('token');


  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/User/GetFriendListByUser`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => {
        if (response.ok) {
          return response.json();

        };


      }).then(data => {

        setUsername(data.username);
        setAvatar(data.avatar);
        var length = data.obj.$values.length;
        console.log(length);



        if (data !== null) {



          for (var i = 0; i < length; i++) {
            setCode(
              <div className={styles.FriendList}>





                {data.obj.$values.map((username, i) => (



                  <><List sx={{ width: '100%', maxWidth: 360, }}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar className={styles.avatar}>
                        <Avatar src={data.obj.$values[i].avatar} />
                      </ListItemAvatar>
                      <div className={styles.username}>
                      {data.obj.$values[i].username}
                        </div>
                      {/* <ListItemText 
                        primary={data.obj.$values[i].username}
                         secondary={<React.Fragment>
                           <Typography
                             sx={{ display: 'inline' }}
                             component="span"
                             variant="body2"
                             color="text.primary"
                           >
                           </Typography>
                         </React.Fragment>} 
                        /> */}
                    </ListItem>
                    
                  </List></>
                ))
                }
              </div>

            );
          }

        }
      });
  }, [])
  return (

    <>{code}</>



  );


}
export default FriendList;
