import styled from '@emotion/styled';
import { Button, CardActions, IconButton, Input, Stack } from '@mui/material';
import React, { FC, SyntheticEvent, useState } from 'react';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import styles from './UploadAvatar.module.scss';

//not ready
interface UploadAvatarProps { }
const UploadAvatar: FC<UploadAvatarProps> = () => {

    const [avatar, setAvatar] = useState(' ');
    var token = localStorage.getItem('token');
    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await fetch(`${process.env.REACT_APP_API}/User/UploadAvatar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },

            body: JSON.stringify({
                avatar

            })
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert("Error while processing the request!");
                }
            }).then(data => {
                console.log(data.token);



            });


    }
    return (
        <div  >
            <form onSubmit={submit}>
                

                    <label htmlFor="contained-button-file" className={styles.UploadAvatar2}>
                        <Input  id="contained-button-file"  type="file" required onChange={e => setAvatar(e.target.value)}/>
                        
                    </label>


                <CardActions className={styles.UploadAvatar} >
                    <Button
                        fullWidth
                        variant="contained"
                        size="small"
                        type="submit">
                        <span>Submit</span>
                    </Button>
                </CardActions>
            </form>
        </div>


    )


}
export default UploadAvatar;
