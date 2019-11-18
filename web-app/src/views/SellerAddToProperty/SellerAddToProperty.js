import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
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
  SellerAddToPropertyButton: {
    margin: theme.spacing(2, 0)
  }
}));

const SellerAddToProperty = props => {
  const { history } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

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

  const handleSellerAddToProperty = event => {
    event.preventDefault();
    console.log(formState.values)
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
                onSubmit={handleSellerAddToProperty}
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
                  label="Price Quote in Lakhs"
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
                  className={classes.SellerAddToPropertyButton}
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
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

SellerAddToProperty.propTypes = {
  history: PropTypes.object
};

export default withRouter(SellerAddToProperty);
