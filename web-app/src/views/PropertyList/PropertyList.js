import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { ProductsToolbar, ProductCard, PropertyCard } from './components';
import mockData from './data';

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

  const [products, setProducts] = useState(mockData);

  useEffect(() => {
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
            });*/}
        }
      });
    }, 10000);
    
  }, [products]);

  return (
    <div className={classes.root}>
      {/*<ProductsToolbar />*/}
      <div className={classes.content}>
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
        </Grid>
      </div>
      <div className={classes.pagination}>
        <Typography variant="caption">1-6 of 20</Typography>
        <IconButton>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton>
          <ChevronRightIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default PropertyList;
