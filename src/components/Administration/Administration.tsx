import { CircularProgress } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './Administration.module.scss';
import SideNavAdmin from './SideNavAdmin/SideNavAdmin';

interface AdministrationProps {}

const Administration: FC<AdministrationProps> = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [returnData, setReturnData] = useState([]);
  const navigate = useNavigate();
  var token = localStorage.getItem('token');

  function CheckAdmin(){
    const requestOptions = {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
    fetch(`${process.env.REACT_APP_API}/AdministrationManagment/UserAuthentication`, requestOptions)
      .then(response => {
        if(response.ok) {
          setIsAdmin(true);
          return response.json();
        } else {
          console.warn("Error while processing the request!");
          setIsAdmin(false);
          document.body.style.backgroundColor = "#181919";
          navigate('/unauthorized');
        }
      })
      .then(data => {
        setReturnData(data);
      })
      .catch(error => {
        console.warn("Error while processing the request!"); 
        setIsAdmin(false);
        document.body.style.backgroundColor = "#181919";
        navigate('/unauthorized');
      });
  }

  function ReturnPage(){
    if(isAdmin)
    {
      document.body.style.backgroundColor = "#303030";
      return(
        <>
          <div>
            <SideNavAdmin userAccount={returnData} />
          </div>
        </>
      );
    }
    else
    {
      return(
        <>
          <div className={styles.Administration}>
            <div style={{textAlign: 'center'}}>
              <CircularProgress style={{width: '5rem', height: '5rem', color: '#666666'}}/>
            </div>
            <div className={styles.TextUnder}>
              Authentication in progress. Please wait...
            </div>
          </div>
        </>
      )
    }
  }

  useEffect(() => {
    CheckAdmin();
    // gets rid of the navbar
    var navbar = document.getElementById('mainNavbar');
    navbar.hidden = true;
  },[])

  return(
    <>
      {ReturnPage()}
    </>
  );
}

export default Administration;
