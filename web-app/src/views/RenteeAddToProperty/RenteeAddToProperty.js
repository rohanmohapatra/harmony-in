import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  Typography,
  FormControl,
  InputLabel,
  Select
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from 'axios';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const schema = {
  propertyName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  },
  propertyAddress: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  },
  bhk: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  },
  price: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  },
  city: {
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
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  RenteeAddToPropertyButton: {
    margin: theme.spacing(2, 0)
  }
}));

const RenteeAddToProperty = props => {
  const { history } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {'propertyType':'rent'},
    touched: {},
    errors: {}
  });
  const [open, setOpen] = React.useState(false);
  const [eOpen, setEOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setEOpen(false);
    setOpen(false);
  };
  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleBack = () => {
    history.goBack();
  };

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleRenteeAddToProperty = event => {
    event.preventDefault();
    formState.values["user"] = localStorage.getItem("username");
    formState.values["societyName"] = formState.values.propertyName;
    console.log(formState.values)
    axios.post("http://localhost:8000/api/v1/properties/", formState.values)
    .then(function(response){
      console.log(response);
      setOpen(true);
      //history.push("/seller/sign-in");
    })
    .catch(function (response) {
      //handle error
      console.log(response);
      setEOpen(true);
    });
    //history.push('/');
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <Grid
        className={classes.grid}
        container
      >
        <Grid
          className={classes.content}
          item
          lg={7}
          xs={12}
        >
          <div className={classes.content}>
            <div className={classes.contentHeader}>
              <IconButton onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
            </div>
            <div className={classes.contentBody}>
              <form
                className={classes.form}
                onSubmit={handleRenteeAddToProperty}
              >
                <Typography
                  className={classes.title}
                  variant="h2"
                >
                  Want to Add Property, Fill in the details below
                </Typography>
                
                <TextField
                  className={classes.textField}
                  error={hasError('propertyAddress')}
                  fullWidth
                  helperText={
                    hasError('propertyAddress') ? formState.errors.propertyAddress[0] : null
                  }
                  label="Property address"
                  name="propertyAddress"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.propertyAddress || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('propertyName')}
                  fullWidth
                  helperText={
                    hasError('propertyName') ? formState.errors.propertyName[0] : null
                  }
                  label="Property Name"
                  name="propertyName"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.propertyName || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('bhk')}
                  fullWidth
                  helperText={
                    hasError('bhk') ? formState.errors.bhk[0] : null
                  }
                  label="No of Bedrooms"
                  name="bhk"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.bhk || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('price')}
                  fullWidth
                  helperText={
                    hasError('price') ? formState.errors.price[0] : null
                  }
                  label="Rent Price"
                  name="price"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.price || ''}
                  variant="outlined"
                />
                {/*
                <TextField
                  className={classes.textField}
                  error={hasError('city')}
                  fullWidth
                  helperText={
                    hasError('city') ? formState.errors.city[0] : null
                  }
                  label="city"
                  name="city"
                  onChange={handleChange}
                  type="city"
                  value={formState.values.city || ''}
                  variant="outlined"
                />*/}
                <FormControl variant="filled" className={classes.formControl}>
                  <InputLabel htmlFor="filled-age-native-simple">City</InputLabel>
                  <Select
                    native
                    error={hasError('city')}
                    helperText={
                      hasError('city') ? formState.errors.city[0] : null
                    }
                    value={formState.values.city || ''}
                    onChange={handleChange}
                    inputProps={{
                      name: 'city',
                      id: 'filled-age-native-simple',
                    }}
                  >
                    <option value={""}></option>
                    <option value={"bangalore"}>Bangalore</option>
                    <option value={"mumbai"}>Mumbai</option>
                    <option value={"patna"}>Patna</option>
                    <option value={"shillong"}>Shillong</option>
                    <option value={"jaipur"}>Jaipur</option>
                    <option value={"kolkata"}>Kolkata</option>
                    <option value={"hyderabad"}>Hyderabad</option>
                    <option value={"ranchi"}>Ranchi</option>
                    <option value={"bhopal"}>Bhopal</option>
                    <option value={"kochi"}>Kochi</option>

                  </Select>
                </FormControl>
                <Button
                  className={classes.RenteeAddToPropertyButton}
                  color="primary"
                  disabled={!formState.isValid}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Add the Property
                </Button>
                
              </form>
              <Snackbar
                  anchorOrigin={{vertical: 'bottom',horizontal: 'right'}}
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                <MySnackbarContentWrapper
                  variant="success"
                  className={classes.margin}
                  message="Added Succesfully"
                />
              </Snackbar>
              <Snackbar
                  anchorOrigin={{vertical: 'bottom',horizontal: 'right'}}
                  open={eOpen}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                <MySnackbarContentWrapper
                  variant="error"
                  className={classes.margin}
                  message="Property could not be added!"
                />
              </Snackbar>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

RenteeAddToProperty.propTypes = {
  history: PropTypes.object
};

export default withRouter(RenteeAddToProperty);
