import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles,withStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardActions,
  CardMedia
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { Facebook as FacebookIcon, Google as GoogleIcon } from 'icons';

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
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
    backgroundImage: 'url(/images/auth.jpg)',
    backgroundSize: 'cover',
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
  HomeButton: {
    margin: theme.spacing(2, 0)
  },
  bannerTitle:
    {
      fontFamily: 'Montserrat',
      fontWeight:'700',  
      fontSize: 100,
        color: '#1f1f1f',
        position: 'relative',
        top:300,
        marginLeft: '10%'  
    },
    bannerGrid:{
        padding: 45,
        color: "linear-gradient( rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.5) )",  
    },

    bannerText:{
        fontFamily: 'Montserrat',
        fontWeight:'500',  
        fontSize: 30,
        color: 'black',
        position: 'relative',
        top:305,
        marginLeft: '12%'  
    },
    
    sectionHeading: {
      color: 'black',
      width: '100%',
      height: '100vh',
      backgroundImage: 'url(/images/realestate.png)',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
    loginGrid: {
      marginTop : '2%',
      padding: '2%'
    },
    card: {
      
    },
    cardImage: {
      height: '30vh'
    },
    joinNowButton: {
      backgroundColor : theme.palette.warning.main,
      borderRadius: 40,
      color: theme.palette.white
    },
    bannerButtonNew:{
      backgroundColor : theme.palette.warning.main,
      borderRadius: 40,
      color: theme.palette.white,
       
  },
    
}));

const Home = props => {
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

  const handleHome = event => {
    event.preventDefault();
    history.push('/');
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;
  const ColorButton = withStyles(theme => ({
      root: {
        color: theme.palette.warning.light,
        borderColor: theme.palette.warning.light,
        '&:hover': {
          backgroundColor: theme.palette.white,
          borderColor: theme.palette.warning.dark
        },
        position: 'relative',
        top: 350,
        marginLeft: '12%',
        padding: 30,
        fontSize:30
      },
    }))(Button);
    
  return (
    <div className={classes.root}>
      <Grid
        className={classes.grid}
        container
      >
        <Grid
          className={classes.sectionHeading}
          item
          lg={12}
        >
          <div className={classes.bannerGrid}><Typography align ="left" className={classes.bannerTitle}>H A R M O N Y . I N</Typography></div>
            <div className="spacer"></div>
              <Typography align="left" className={classes.bannerText}>FIND A HOME.</Typography>
            <div className="spacer"></div>
            <ColorButton className={classes.bannerButtonNew} variant="outlined" size="large" color="secondary" className={classes.button} href="/properties">
              View Properties
            </ColorButton>
        
        </Grid>
      </Grid>
      <Grid
        className={classes.loginGrid}
        container
      >
        <Grid
          className={classes.quoteContainer}
          item
          lg={4}
        >
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="500"
                image="/images/cards/seller.jpeg"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h4" component="h2">
                  Are You a Seller?
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Click Below to Put up a Property for Sale
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="large" color="primary" className={classes.joinNowButton} href="/seller/sign-in">
                Join Now
              </Button>
            </CardActions>
          </Card>

        </Grid>
        <Grid
          className={classes.quoteContainer}
          item
          lg={4}
        >
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="500"
                image="/images/cards/buyer.png"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h4" component="h2">
                  Are You Looking for a Property?
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Click Below to Find Properties
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="large" color="secondary" className={classes.joinNowButton} href="/buyer/sign-in">
                Join Now
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid
          className={classes.quoteContainer}
          item
          lg={4}
        >
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="500"
                image="/images/cards/rentee.png"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h4" component="h2">
                  Are You looking to put up your house for Rent?
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Click Below to Join our network
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="large" color="primary" className={classes.joinNowButton} href="/rentee/sign-in">
                Join Now
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

Home.propTypes = {
  history: PropTypes.object
};

export default withRouter(Home);
