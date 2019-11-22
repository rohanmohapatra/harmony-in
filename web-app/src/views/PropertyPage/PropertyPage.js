import React, { useState, useEffect } from 'react';
import {PropertyCard} from './components';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles, useTheme } from '@material-ui/styles';
import axios from 'axios';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  Divider,
  Typography,
  Card,
  CardContent
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';


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
const useStyles2 = makeStyles(theme => ({
  root: {
    maxWidth: 400,
    flexGrow: 1,
    marginTop : 50
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 255,
    maxWidth: 400,
    overflow: 'hidden',
    display: 'block',
    width: '100%',
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
    height: 100,
    marginLeft: 20,
    marginBottom: 20
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
    marginTop: theme.spacing(3),
    marginBottom : 20
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
  PropertyPageButton: {
    margin: theme.spacing(2, 0)
  },
  imageContainer: {
    height: 600,
    marginBottom: 15,
    align:'center',
    borderRadius : 100,
    marginTop: 20,
    marginLeft : 50
  },
  priceContainer: {
    width : 800,
    height: 200,
    borderRadius : 20,
    marginTop: 20,
    marginLeft : 50,
    fontFamily: 'Montserrat',
      fontWeight:'900',  
    padding: 50
  },
  propertyAddHeader:{
    fontFamily: 'Montserrat',
      fontWeight:'900', 
      fontSize : 50
  },
  card:{
    borderRadius: 20,
    width: 300
  },
  cardHeader:{
    fontFamily: 'Montserrat',
      fontWeight:'500', 
      fontSize : 30
  },
  cardFeature:{
    fontFamily: 'Montserrat',
      fontWeight:'500', 
      fontSize : 20,
      padding: 40
  },
}));

const PropertyPage = props => {
  const { history , propertyId } = props;

  const classes = useStyles();
  const classes2 = useStyles2();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBackStep = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });
  const [imageUrl, setImgUrl] = useState("/images/dummy.jpg")
  const [property, setProperty] = useState({
  
  });
  const [location, setLocation] = useState("");
  const [recommendedProps, setRecommendedProps] = useState([{
    "bhk": 3,
    "city": "bangalore",
    "moreData": "",
    "price": 10300,
    "propId": "prop00001",
    "propertyAddress": "Hoodi Circle, Hoodi",
    "propertyName": "Raja Ritz Avenue",
    "propertyType": "rent",
    "societyName": "Raja Ritz Avenue",
    "user": "seller1"
  }]);
  const maxSteps = recommendedProps.length;
  var tutSteps = [];
  useEffect(() => {
    console.log(props.match.url);
    const fetchData = async () => {
      var output = props.match.url.split(/[0]+/).pop();
      console.log(parseInt(output));
      const result = await axios({
        url: 'http://localhost:8000/api/v1/properties/'+parseInt(output),
      });
      setProperty(result.data);
      setImgUrl("http://localhost:5000/recommender/get_image/"+result.data.propId);
      setLocation(result.data.city.charAt(0).toUpperCase() + result.data.city.slice(1))
      if(localStorage.getItem("username")){
        const result2 = await axios({
          url : 'http://localhost:5000/user_recommendations/' + localStorage.getItem("username"),
        });

        setRecommendedProps(result2.data.result);
        console.log(result2.data.result)
        //tutSteps = result2
      }

    };
    fetchData(); 
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

  const handlePropertyPage = event => {
    event.preventDefault();
    history.push('/');
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;
  const bull = <span className={classes.bullet}>•</span>;
  return (
    <div className={classes.root}>
      <Grid
        className={classes.grid}
        container
      >
        <Grid
          className={classes.productContainer}
          item
          lg={5}
        >
          <div className={classes.imageContainer}>
              <img
                alt="Property"
                className={classes.image}
                src={imageUrl}
                height = '550'
              />
          </div>
          <Divider />
          <Card className={classes.priceContainer}>
          <Typography className={classes.cardHeader} variant="h1" color="textSecondary" gutterBottom>
                      Price
                    </Typography>
              <Typography
                className={classes.price}
                variant = "h2"
                >
                  Rs. {property.price} {property.propertyType == "buy" ? "Lakhs" : "/-"}
                </Typography>
          </Card>
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
            <div className={classes.contentHeader}>
            
              <Typography variant="h1" className={classes.propertyAddHeader}>
                {property.propertyName}
              </Typography>
            </div>
            <div className={classes.contentBody}>
            
              <Typography
                  className={classes.title}
                  variant="h4"
                >
                  {property.propertyAddress}
                </Typography>
                <Typography
                  className={classes.title}
                  variant="h4"
                >
                  <LocationOnIcon />
                  {location}
                </Typography>
            </div>
            <div>
            <Card className={classes.card}>
                  <CardContent>
                    <Typography className={classes.cardHeader} color="textSecondary" gutterBottom>
                      Features
                    </Typography>
                    <Typography variant="h5" component="h2" className={classes.cardFeature}>
                      {bull} {property.bhk} bhk
                    </Typography>
                  </CardContent>
              </Card>
            </div>
            {(() => {
              if(localStorage.getItem("username")){
                return(
                  <div className={classes2.root}>
                    <Typography variant="h2"> Recommended Properties </Typography>
                  <PropertyCard product={recommendedProps[activeStep]} price_type="" />
                  <MobileStepper
                    steps={maxSteps}
                    position="static"
                    variant="text"
                    activeStep={activeStep}
                    nextButton={
                      <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                        Next
                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                      </Button>
                    }
                    backButton={
                      <Button size="small" onClick={handleBackStep} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                        Back
                      </Button>
                    }
                  />
                </div>

                )
              }
            
             })()}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

PropertyPage.propTypes = {
  history: PropTypes.object
};

export default withRouter(PropertyPage);
