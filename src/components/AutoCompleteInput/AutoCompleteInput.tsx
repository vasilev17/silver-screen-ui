import * as React from "react";
import PropTypes from "prop-types";
import { useAutocomplete } from "@mui/base/AutocompleteUnstyled";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import styles from './AutoCompleteInput.module.scss';
import { useEffect, useState } from "react";
import { Avatar } from "@mui/material";


interface AutoCompleteInputProps {
  onAutocompleteChange
}




var token = localStorage.getItem('token');


function Tag(props) {
  const { label, onDelete, ...other } = props;
  return (
    <div className={styles.styledTag}  {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  );
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default function AutoCompleteInput(data:AutoCompleteInputProps) {

  const [friendList, setFriendList] = useState([]);

  useEffect(() => {

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
    fetch(`${process.env.REACT_APP_API}/User/GetFriendListByUser`, requestOptions)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      }).catch(() => {

        console.warn("Error while processing the Get Friend List Request!");

      })
      .then(info => {

        if (info != null) {

          var infoList = [];
          info.obj.$values.map(user => {
            infoList.push({ id: user.id, username: user.username, avatar: user.avatar });
          });
          setFriendList(infoList);

        }
      });

  }, []);

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl
  } = useAutocomplete({
    multiple: true,
    disableCloseOnSelect: true,
    options: friendList,
    getOptionLabel: (option) => option.username
  });

  return (
    <>

      <div className={styles.root}>
        <div {...getRootProps()}>
          <label className={styles.label} {...getInputLabelProps()}>Select friend(s):</label>
          <div className={`${styles.inputWrapper} ${focused ? styles.focused : ""}`} ref={setAnchorEl}>
            {value.map((option: any, index) => (
              <Tag label={option.username} {...getTagProps({ index })} />
            ))}
            <input {...getInputProps()} defaultValue={data.onAutocompleteChange(value)} />
          </div>
        </div>
        {groupedOptions.length > 0 ? (
          <ul className={styles.listBox} {...getListboxProps()}>
            {groupedOptions.map((option, index) => (
              <li className={styles.optionContainer} {...getOptionProps({ option, index })}>
                <Avatar alt='userAvatar' src={option.avatar} style={{ marginRight: '1rem' }} />
                <span>{option.username}</span>
                <CheckIcon fontSize="small" />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </>
  );
}
