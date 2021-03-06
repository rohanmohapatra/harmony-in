import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
    backgroundColor: theme.palette.warning.light,
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));

const Topbar = props => {
  const { className, onSidebarOpen, ...rest } = props;

  const classes = useStyles();

  const [notifications] = useState([]);
  const handleClick = () => {
    localStorage.clear();
    window.location.href="/properties"
  };
  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar>
        <RouterLink to="/">
          <img
            alt="Logo"
            src="/images/harmony.png"
            height="45px"
          />
        </RouterLink>
        <div className={classes.flexGrow} />
        {(() => {
          if(localStorage.getItem("username") && localStorage.getItem("usertype")){
            return(
              <Hidden mdDown>
              <IconButton color="inherit">
                <Badge
                  badgeContent={notifications.length}
                  color="primary"
                  variant="dot"
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                className={classes.signOutButton}
                color="inherit"
                onClick={handleClick}
              >
                <InputIcon />
              </IconButton>
            </Hidden>
            )
          }
          else{
            return(
            <Hidden mdDown>
              <Button color="inherit" href="/buyer/sign-in">Sign In</Button>
            </Hidden>)
          }
      })()}
        
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onSidebarOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;
