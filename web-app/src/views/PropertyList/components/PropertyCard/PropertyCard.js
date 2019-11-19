import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider,
  Button
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GetAppIcon from '@material-ui/icons/GetApp';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';


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
  product["imageUrl"] = "/images/dummy.jpg";
  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
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
            <Button variant="outlined" color="primary" className={classes.button}>
              <ShoppingBasketIcon />
              Add to Wishlist
            </Button>
          </Grid>
          <Grid
            className={classes.statsItem}
            item
          >
            <GetAppIcon className={classes.statsIcon} />
            <Typography
              display="inline"
              variant="body2"
            >
              {product.totalDownloads} Views
            </Typography>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

PropertyCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default PropertyCard;
