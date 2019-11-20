import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { UsersToolbar, UsersTable, AccountProfile } from './components';
import mockData from './data';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const ViewProperties = () => {
  const classes = useStyles();

  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {

      const result = await axios({
        url: 'http://localhost:8000/api/v1/properties/user',
        headers: {
          Authorization: 'JWT ' + localStorage.getItem("token") //the token is a variable which holds the token
        }
      });
      setUsers(result.data);
      console.log(result.data);
    };
    fetchData();
    console.log(users);
  }, []);

  return (
    <div className={classes.root}>
      <AccountProfile />
      <div className={classes.content}>
        <UsersTable users={users} />
      </div>
    </div>
  );
};

export default ViewProperties;
