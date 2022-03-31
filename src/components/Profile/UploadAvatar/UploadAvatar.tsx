import styled from '@emotion/styled';
import { Button, CardActions, IconButton, Stack } from '@mui/material';
import React, { FC, SyntheticEvent, useState } from 'react';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import styles from './UploadAvatar.module.scss';
import axios from "axios";

const Input = styled('input')({
    display: 'none',
  });
interface UploadAvatarProps { }
const UploadAvatar: FC<UploadAvatarProps> = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isFilePicked, setIsFilePicked] = useState(false);
    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };
    const handleSubmission = () => {
        submit();
        
    };
    var token = localStorage.getItem('token');
    const submit = async () => {
        if(isFilePicked) {
            const formData = new FormData();
		    formData.append('file', selectedFile);
            console.log(selectedFile);

            const config = {
                headers: { Authorization: `Bearer ${token}`}
            };

            try{
                const res = await axios.post(`${process.env.REACT_APP_API}/User/UploadAvatar`, formData, config);
                console.log(res);
                window.location.reload();
            } catch(ex){
                console.log(ex);
            }
        }
    

    }
    return (
        <div  >


                <label htmlFor="contained-button-file" >
                    <Input accept="image/*" id="contained-button-file" type="file" required onChange={changeHandler} />
                    <Button size="large" variant="contained" component="span" className={styles.UploadAvatar2}>
                        change 
                    </Button>
                    </label>
                    <div >
        <Button size="small" className={styles.UploadAvatar} onClick={handleSubmission}>Submit</Button>
          </div>
                


                
        </div>


    )


}
export default UploadAvatar;
