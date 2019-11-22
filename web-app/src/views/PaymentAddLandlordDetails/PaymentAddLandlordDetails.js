import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import clsx from 'clsx';
import sha1 from 'sha1';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  FormHelperText,
  Checkbox,
  Typography
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
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
  name: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 100
    }
  },
  account_no : {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32
    }
  },
  ifsc_code: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32
    }
  },
  phone_number: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  },
  rent_amount: {
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
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/login/payment.svg)',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
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
  textField: {
    marginTop: theme.spacing(2)
  },
  policy: {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  },
  policyCheckbox: {
    marginLeft: '-14px'
  },
  PaymentAddLandlordDetailsButton: {
    margin: theme.spacing(2, 0)
  }
}));

const PaymentAddLandlordDetails = props => {
  const { history } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

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

  const handleBack = () => {
    history.goBack();
  };

  const handlePaymentAddLandlordDetails = event => {
    event.preventDefault();
    var stripeSess = "";
    //history.push('/');
    //console.log(formState.values);
    //var data = {
    //  "username" : formState.values.username,
    //  "password" : sha1(formState.values.password)
    //};
    formState.values.rent_amount = parseInt(formState.values.rent_amount);
    console.log(formState.values);
    axios.post("http://localhost:8000/api/v1/payment/add_landlord", formState.values)
    .then(function(response){
      console.log(response);
      //history.push("/rentee/sign-in");
    })
    .catch(function (response) {
      //handle error
      console.log(response);
      setOpen(true);
    });
    var data = {
      email : formState.values.email
    }
    axios.post("http://localhost:8000/api/v1/payment/pay_rent",data)
    .then(function(response){
      console.log(response);
      stripeSess = response.data;
      var stripe = window.Stripe('pk_test_QCSWZXL3oR2b3kPNCk5L1UJr00hDYrW5Y4');
        stripe.redirectToCheckout({
            sessionId: response.data
        }).then(function(result) {
            if(result.error) {
                alert('Payment failed');
            }
        });
    });
    
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
          className={classes.quoteContainer}
          item
          lg={5}
        >
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
            </div>
          </div>
        </Grid>
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
                onSubmit={handlePaymentAddLandlordDetails}
              >
                <Typography
                  className={classes.title}
                  variant="h2"
                >
                  Add Landlord Details
                </Typography>
                <Typography
                  color="textSecondary"
                  gutterBottom
                >
                </Typography>
                <TextField
                  className={classes.textField}
                  error={hasError('name')}
                  fullWidth
                  helperText={
                    hasError('name') ? formState.errors.name[0] : null
                  }
                  label="Name of Landlord"
                  name="name"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.name || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('email')}
                  fullWidth
                  helperText={
                    hasError('email') ? formState.errors.email[0] : null
                  }
                  label="Email address"
                  name="email"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.email || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('account_no')}
                  fullWidth
                  helperText={
                    hasError('account_no') ? formState.errors.account_no[0] : null
                  }
                  label="Account Number"
                  name="account_no"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.account_no || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('ifsc_code')}
                  fullWidth
                  helperText={
                    hasError('ifsc_code') ? formState.errors.ifsc_code[0] : null
                  }
                  label="IFSC Code"
                  name="ifsc_code"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.ifsc_code || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('phone_number')}
                  fullWidth
                  helperText={
                    hasError('phone_number') ? formState.errors.phone_number[0] : null
                  }
                  label="Phone Number"
                  name="phone_number"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.phone_number || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('rent_amount')}
                  fullWidth
                  helperText={
                    hasError('rent_amount') ? formState.errors.rent_amount[0] : null
                  }
                  label="Rent Amount"
                  name="rent_amount"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.rent_amount || ''}
                  variant="outlined"
                />

                {/*
                <div className={classes.policy}>
                  <Checkbox
                    checked={formState.values.policy || false}
                    className={classes.policyCheckbox}
                    color="primary"
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography
                    className={classes.policyText}
                    color="textSecondary"
                    variant="body1"
                  >
                    I have read the{' '}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      Terms and Conditions
                    </Link>
                  </Typography>
                </div>
                {hasError('policy') && (
                  <FormHelperText error>
                    {formState.errors.policy[0]}
                  </FormHelperText>
                )}
                */}
                <Button
                  className={classes.PaymentAddLandlordDetailsButton}
                  color="primary"
                  disabled={!formState.isValid}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Pay Now
                </Button>
                <Snackbar
                  anchorOrigin={{vertical: 'bottom',horizontal: 'right'}}
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                <MySnackbarContentWrapper
                  variant="error"
                  className={classes.margin}
                  message="Error! Please try again"
                />
              </Snackbar>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

PaymentAddLandlordDetails.propTypes = {
  history: PropTypes.object
};

export default withRouter(PaymentAddLandlordDetails);
