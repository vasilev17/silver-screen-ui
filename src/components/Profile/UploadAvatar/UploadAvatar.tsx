import styled from '@emotion/styled';
import { Button, CardActions, IconButton, Stack } from '@mui/material';
import React, { FC, SyntheticEvent, useState } from 'react';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import styles from './UploadAvatar.module.scss';


interface UploadAvatarProps { }
const Input = styled('input')({
    display: 'none',
});
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
                window.location.reload();



            });


    }
    return (
        <div  >
            <form onSubmit={submit}>

                <Stack direction="row" alignItems="center" spacing={2} className={styles.UploadAvatar2}>

                    <label htmlFor="icon-button-file">
                        <Input accept="image/*"id="icon-button-file"type="file" required onChange={e => setAvatar(e.target.value)}
                        />
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera />
                        </IconButton>
                    </label>
                </Stack>


                <CardActions className={styles.UploadAvatar} >
                    <Button
                        fullWidth
                        variant="contained"
                        size="small"
                        type="submit">
                        <span><h1>Submit</h1></span>
                    </Button>
                </CardActions>
            </form>
        </div>


    )


}
export default UploadAvatar;
