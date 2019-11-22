/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { useState, forwardRef } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { List, ListItem, Button, colors, FormControl, Divider } from '@material-ui/core';
import {
  Grid,
  IconButton,
  TextField,
  Link,
  Typography,
  Select,
  InputLabel,
  MenuItem
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: colors.blueGrey[800],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.primary.main
    }
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  filterButtons :{
    marginTop: theme.spacing(2),
    marginRight : 7
  }
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <RouterLink {...props} />
  </div>
));

const Filter = props => {
  const { pages, className, ...rest } = props;
  const [airQuality, setAirQuality] = useState();
  const [traffic, setTraffic] = useState();
  const [city, setCity] = useState();
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });
  const classes = useStyles();
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
  const handleAirQualityClick = event => {
    event.persist();
    setAirQuality(event.target.value);
    console.log(event.target.value);
  }
  const handleCityClick = event => {
    event.persist();
    setCity(event.target.value);
    console.log(event.target.value);
  }
  const handleTrafficClick = event => {
    event.persist();
    setTraffic(event.target.value);
    console.log(event.target.value);
  }
  const handleFilters = event =>{
    console.log(formState);
    var filter = {
      "filters": {
        "bhk" : [formState.values.BHKLowerLimit, formState.values.BHKHigherLimit],
        "cost": [formState.values.CostLowerLimit, formState.values.CostHigherLimit],
        "sqFeetArea":[formState.values.SquareFeetAreaLowerLimit, formState.values.SquareFeetAreaHigherLimit],
        "airQuality": airQuality,
        "traffic" : traffic,
        "city" : city
      }
    };
    localStorage.setItem('filters', JSON.stringify(filter));
  }
  const handleFiltersClear = () =>{
    localStorage.removeItem("filters");
    //setTraffic("");
    //setAirQuality("");
    
  }
  return (
    <List
      {...rest}
      className={clsx(classes.root, className)}
    >
      {/* 
      {pages.map(page => (
        <ListItem
          className={classes.item}
          disableGutters
          key={page.title}
        >
          <Button
            activeClassName={classes.active}
            className={classes.button}
          >
            <div className={classes.icon}>{page.icon}</div>
            {page.title}
          </Button>
        </ListItem>
        ))}
        */}
        <Grid
            container
            spacing={2}
          >
            <Grid item>
                <Typography
                      align="left"
                      color="textSecondary"
                      variant="body1"
                    >
                      Cost
                </Typography>
            </Grid>
            <Grid item>
            <TextField
                  className={classes.textField}
                  fullWidth
                  label="0"
                  name="CostLowerLimit"
                  onChange={handleChange}
                  type="text"
                  variant="outlined"
                />
            </Grid>
            <Grid item>
            <TextField
                  className={classes.textField}
                  fullWidth
                  label="100"
                  name="CostHigherLimit"
                  onChange={handleChange}
                  type="text"
                  variant="outlined"
                />
            </Grid>
        </Grid>
        <Grid
            container
            spacing={2}
          >
          {/*
            <Grid item>
                <Typography
                      align="left"
                      color="textSecondary"
                      variant="body1"
                    >
                      Square Feet Area
                </Typography>
            </Grid>
            <Grid item>
            <TextField
                  className={classes.textField}
                  fullWidth
                  label="0"
                  name="SquareFeetAreaLowerLimit"
                  onChange={handleChange}
                  type="text"
                  variant="outlined"
                />
            </Grid>
        
            <Grid item>
            <TextField
                  className={classes.textField}
                  fullWidth
                  label="100"
                  name="SquareFeetAreaHigherLimit"
                  onChange={handleChange}
                  type="text"
                  variant="outlined"
                />
            </Grid>
            */}
        </Grid>
        
        <Grid
            container
            spacing={2}
          >
            <Grid item>
                <Typography
                      align="left"
                      color="textSecondary"
                      variant="body1"
                    >
                      BHK
                </Typography>
            </Grid>
            <Grid item>
            <TextField
                  className={classes.textField}
                  fullWidth
                  label="0"
                  name="BHKLowerLimit"
                  onChange={handleChange}
                  type="text"
                  variant="outlined"
                />
            </Grid>
            <Grid item>
            <TextField
                  className={classes.textField}
                  fullWidth
                  label="100"
                  name="BHKHigherLimit"
                  onChange={handleChange}
                  type="text"
                  variant="outlined"
                />
            </Grid>
        </Grid>
        <Grid
            container
            spacing={4}
          >
            <Grid item>
                <Typography
                      align="left"
                      color="textSecondary"
                      variant="body1"
                    >
                      Air Quality
                </Typography>
            </Grid>
            <Grid item>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={airQuality}
              onChange={handleAirQualityClick}
              labelWidth={10}
            >
              <MenuItem value={""}>
              </MenuItem>
              <MenuItem value={"low"}>
                Low
              </MenuItem>
              <MenuItem value={"moderate"}>Medium</MenuItem>
              <MenuItem value={"high"}>High</MenuItem>
            </Select>
            </Grid>
        </Grid>
        <Grid
            container
            spacing={4}
          >
            <Grid item>
                <Typography
                      align="left"
                      color="textSecondary"
                      variant="body1"
                    >
                      Traffic
                </Typography>
            </Grid>
            <Grid item>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={traffic}
              onChange={handleTrafficClick}
              labelWidth={10}
            >
              <MenuItem value={""}>
              </MenuItem>
              <MenuItem value={"low"}>
                <em>Low</em>
              </MenuItem>
              <MenuItem value={"medium"}>Medium</MenuItem>
              <MenuItem value={"high"}>High</MenuItem>
            </Select>
            </Grid>
        </Grid>
        <Grid
            container
            spacing={4}
          >
            <Grid item>
                <Typography
                      align="left"
                      color="textSecondary"
                      variant="body1"
                    >
                      City
                </Typography>
            </Grid>
            <Grid item>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={city}
              onChange={handleCityClick}
              labelWidth={10}
            >
                            <option value={""}></option>
                            <option value={"bangalore"}>Bangalore</option>
                            <option value={"chennai"}>Chennai</option>
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
                </Grid>
                </Grid>
        <Grid
            container
            spacing={2}
          >
            <Divider />
        <Button
          color="primary"
          onClick={handleFilters}
          size="large"
          variant="contained"
          className={classes.filterButtons}
        >
          Apply
        </Button>

        <Button
          color="primary"
          onClick={handleFiltersClear}
          size="large"
          variant="contained"
          outlined
          className={classes.filterButtons}
        >
          Clear
        </Button>
        </Grid>
    </List>
  );
};

Filter.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired
};

export default Filter;
