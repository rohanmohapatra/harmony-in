import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme} from '@material-ui/styles';
import SwipeableViews from 'react-swipeable-views';
import axios from 'axios';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import { ProductsToolbar, ProductCard, PropertyCard } from './components';
import mockData from './data';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStylesT = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 1800,
  },
}));

function FullWidthTabs(props) {
  const {buyProperty, rentProperty} =props;
  const classes = useStylesT();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered

        >
          <Tab label="Buy" {...a11yProps(0)} />
          <Tab label="Rent" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
        <Grid
          container
          spacing={3}
        >
          {buyProperty.map(product => (
            <Grid
              item
              key={product.propId}
              lg={4}
              md={6}
              xs={12}
            >
              <PropertyCard product={product} price_type="Lakhs"  />
            </Grid>
          ))}
        </Grid>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <Grid
          container
          spacing={3}
        >
          {rentProperty.map(product => (
            <Grid
              item
              key={product.propId}
              lg={4}
              md={6}
              xs={12}
            >
              <PropertyCard product={product} price_type=""/>
            </Grid>
          ))}
        </Grid>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}));

const PropertyList = () => {
  const classes = useStyles();

  const [products, setProducts] = useState([]);
  const [buyProperty, setBuyProperty] = useState([]);
  const [rentProperty, setRentProperty] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      var host = 'localhost'
    var landingPage = this;
    var apiBaseUrl = '/api/v1/properties/';
    var apiBasePort = '8000';
    const result = await axios({
        url: 'http://localhost:8000'+apiBaseUrl,
      });
      if(result.status === 200){
        console.log("Status is 200")
        setProducts(result.data);
        console.log(products);
    }
    var buyPropertyList = []
    var rentPropertyList = []
    console.log(result.data);
    for (var i = 0; i<result.data.length; i++){
      if(result.data[i].propertyType == "buy")
        buyPropertyList.push(result.data[i]);
      else
        rentPropertyList.push(result.data[i]);
    }
    setBuyProperty(buyPropertyList);
    setRentProperty(rentPropertyList);
    console.log(buyPropertyList);
    console.log(rentPropertyList);
  };
    fetchData();

    setInterval(fetchData, 10000);
    /*
    setInterval(() => {
    var host = 'localhost'
    var landingPage = this;
    var apiBaseUrl = '/api/v1/properties/';
    var apiBasePort = '8000';
    axios.get('http://localhost:8000'+apiBaseUrl)
    .then(function(response){
        if(response.status === 200){
            console.log("Status is 200")
            setProducts(response.data);
            console.log(products);
            {/*
            response.data.forEach(element => {
                propertyCards.push(<Grid item md={3} style={style}><SimpleCard propertyName={element.propertyName} propertyAddress={element.propertyAddress} price={element.price} bhk={element.bhk}></SimpleCard></Grid>)
            });}
        }
      });
    }, 1000);*/
    
  }, []);

  return (
    <div className={classes.root}>
      {/*<ProductsToolbar />*/}
      <div className={classes.content}>
        <FullWidthTabs buyProperty={buyProperty} rentProperty={rentProperty} />
        {/*
        <Grid
          container
          spacing={3}
        >
          {products.map(product => (
            <Grid
              item
              key={product.propId}
              lg={4}
              md={6}
              xs={12}
            >
              <PropertyCard product={product} />
            </Grid>
          ))}
          </Grid>*/}
      </div>
      {/*<div className={classes.pagination}>
        <Typography variant="caption">1-6 of 20</Typography>
        <IconButton>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton>
          <ChevronRightIcon />
        </IconButton>
        </div>*/}
    </div>
  );
};

export default PropertyList;
