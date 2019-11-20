import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme} from '@material-ui/styles';
import SwipeableViews from 'react-swipeable-views';
import axios from 'axios';
import { IconButton, Grid, Typography, Button } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import { ProductsToolbar, ProductCard, PropertyCard, WishListCard} from './components';
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
  const handleClick =(id, event) => {
    console.log(event.target);
    console.log(id);
    if(localStorage.getItem("username")){
      var data = {
        action : 2,
        user : localStorage.getItem("username"),
        property_id : id
      }
      var result = axios.post("http://localhost:5000/user_actions", data);
      console.log(result.data);
    }
  }
  const handleHover =(id, event) => {
    console.log(event.target);
    console.log(id);
    if(localStorage.getItem("username")){
      var data = {
        action : 1,
        user : localStorage.getItem("username"),
        property_id : id
      }
      var result = axios.post("http://localhost:5000/user_actions", data);
      console.log(result.data);
    }
  }

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
              <PropertyCard product={product} price_type="Lakhs" onClick={(event)=>{handleClick(product.propId,event)}} onMouseOver={(event)=>{handleHover(product.propId,event)}} />
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
              <PropertyCard product={product} price_type="" onClick={(event)=>{handleClick(product.propId,event)}} onMouseOver={(event)=>{handleHover(product.propId,event)}}/>
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

const useStylesDrawer = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});


const PropertyList = () => {
  const classes = useStyles();

  const [products, setProducts] = useState([]);
  const [buyProperty, setBuyProperty] = useState([]);
  const [rentProperty, setRentProperty] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [wishlistProperties , setWishlistProperties] = useState([]);
  const handleDrawer = () =>{
    setDrawerOpen(true);
  }

  const classesDrawer = useStylesDrawer();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const accessWishlist = () => {
    const fetchData = async () => {

      const result = await axios({
        url: 'http://localhost:8000/api/v1/cart',
        headers: {
          Authorization: 'JWT ' + localStorage.getItem("token") //the token is a variable which holds the token
        }
      });
      setWishlistProperties(result.data);

    };
    if(localStorage.getItem("token"))
      fetchData();
  }

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
    accessWishlist();
    if(open == true)
      accessWishlist();
  };

  const sideList = (side,wishlistProperties) => (
    <div
      className={classesDrawer.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <Typography variant="h4">
        Wishlist
      </Typography>

      <Divider />
      {wishlistProperties.map(product => (
            <Grid
              item
              key={product.propId}
              lg={4}
              md={6}
              xs={12}
            >
              <WishListCard product={product}  />
            </Grid>
          ))}
    </div>
  );

  const fullList = side => (
    <div
      className={classesDrawer.fullList}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  useEffect(() => {


    const fetchDataWithFilters = async () => {

          var data=JSON.parse(localStorage.getItem("filters"));
          ///api/v1/properties_filter?societyName=&propertyName=&propertyAddress=&city=&max_price=&min_price=&min_bhk=2&max_bhk=5
          var city = (data.filters.city != undefined) ? data.filters.city : '';
          var max_price =  (data.filters.cost[1] != null) ? data.filters.cost[1] : '';
          var min_price = (data.filters.cost[0] != null) ? data.filters.cost[0] : '';
          var min_bhk = (data.filters.bhk[0] != null) ? data.filters.bhk[0] : '';
          var max_bhk = (data.filters.bhk[1] != null) ? data.filters.bhk[1] : '';
          var host = 'localhost'
          var landingPage = this;
          var apiBaseUrl = '/api/v1/properties_filter?';
          var apiBasePort = '8000';
          const result = await axios({
              url: 'http://localhost:8000'+apiBaseUrl + "societyName=&propertyName=&propertyAddress=&"+"city="+city+"&max_price="+max_price+"&min_price="+min_price+"&min_bhk="+min_bhk+"&max_bhk="+max_bhk,
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

    setInterval(function(){
      if(localStorage.getItem("filters"))
        fetchDataWithFilters();
      else
        fetchData();
    },3000)

    
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
      {(() => {
        if(localStorage.getItem("token")){
          return (<Button onClick={toggleDrawer('right', true)}>Open Wishlist</Button>)
        }

      })()}
      <Drawer anchor="right" open={state.right} onClose={toggleDrawer('right', false)}>
        {sideList('right',wishlistProperties)}
      </Drawer>
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
