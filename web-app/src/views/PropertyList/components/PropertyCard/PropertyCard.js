import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider,
  Button,
  IconButton
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GetAppIcon from '@material-ui/icons/GetApp';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import ChatIcon from '@material-ui/icons/Chat';
const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};
const schema = {
  username: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  }
};
const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));
function MySnackbarContentWrapper(props) {
  const classes = useStyles1();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
};

const useStyles2 = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
}));


const useStyles = makeStyles(theme => ({
  root: {},
  imageContainer: {
 
    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%'
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
  }
}));

const PropertyCard = props => {
  const { className, product, price_type, ...rest } = props;
  product["imageUrl"] = "http://localhost:5000/recommender/get_image/"+product.propId;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [eOpen, setEOpen] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [route, setRoute] = React.useState("");
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setEOpen(false);
  };
  useEffect(() =>{
    var x = localStorage.getItem("username");
    console.log(x);
    setUsername(x);
    console.log(product.user);
    var route = "/client/"+localStorage.getItem("username")+"/"+product.user;
    setRoute(route);
  }, []);  
  const addToWishlist = (id, event) =>{
    var nData = {"propertyId" : id};
    const fetchData = async () => {

      const result = await axios({
        method: 'post',
        url: 'http://localhost:8000/api/v1/cart/add/',
        headers: {
          Authorization: 'JWT ' + localStorage.getItem("token") //the token is a variable which holds the token
        },
        data :nData
      });
      setOpen(true);
    };
    if(localStorage.getItem("token"))
      fetchData();


    if(localStorage.getItem("username")){
        var data = {
          action : 3,
          user : localStorage.getItem("username"),
          property_id : id
        }
        var result = axios.post("http://localhost:5000/user_actions", data);
        console.log(result.data);
      }
  }
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
      md={6}
      xs={12}
    >
      <CardContent>
        <div className={classes.imageContainer}>
          <img
            alt="Product"
            className={classes.image}
            src={product.imageUrl}
            
          />
        </div>
        <Typography
          align="center"
          gutterBottom
          variant="h4"
        >
          {product.propertyName}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
        </Typography>
        <Typography
          align="center"
          variant="body1"
        >
          {product.propertyAddress}
          
        </Typography>
        <Typography
          align="center"
          variant="body1"
        >
          {product.city}
          
        </Typography>
        <Typography
          align="center"
          variant="body1"
        >
           BHK: {product.bhk}
          
        </Typography>
        <Typography
          align="center"
          variant="h2"
        >
           Price: {product.price} {price_type}
          
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Grid
          container
          justify="space-between"
        >
          <Grid
            className={classes.statsItem}
            item
          >
            <Button variant="outlined" color="primary" className={classes.button} href={product.propId}>
              <ArrowRightIcon />
              Know More
            </Button>
          </Grid>
          <Grid
            className={classes.statsItem}
            item
          >
            <Button variant="outlined" color="primary" className={classes.button} onClick ={(event) => {addToWishlist(product.propId, event)}}>
              <ShoppingBasketIcon />
              Add to Wishlist
            </Button>
          </Grid>
          <Grid
            className={classes.statsItem}
            item
          >
           <Button color = "primary" size ="large" href = {route}>
          <ChatIcon></ChatIcon >
          </Button>
          </Grid>
        </Grid>
      </CardActions>
      <Snackbar
                  anchorOrigin={{vertical: 'bottom',horizontal: 'right'}}
                  open={eOpen}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                <MySnackbarContentWrapper
                  variant="error"
                  className={classes.margin}
                  message="Username or Password might be wrong!"
                />
              </Snackbar>
              <Snackbar
                  anchorOrigin={{vertical: 'bottom',horizontal: 'right'}}
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                <MySnackbarContentWrapper
                  variant="success"
                  className={classes.margin}
                  message="Added to Wishlist"
                />
              </Snackbar>
    </Card>
  );
};

PropertyCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default PropertyCard;
