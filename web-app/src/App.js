import React, { Component, useState, useEffect } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';
import axios from 'axios';
import { chartjs } from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import validators from './common/validators';
import Routes from './Routes';

const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

validate.validators = {
  ...validate.validators,
  ...validators
};

export default class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      propertyIds:[],
    }
  }
  componentWillMount(){
    const fetchData = async () => {

      const result = await axios({
        url: 'http://localhost:8000/api/v1/propIds',
      });
      for(var i=0; i < result.data.length;i++){
        result.data[i] = "/"+result.data[i];
      }
      this.setState({propertyIds : result.data});
      console.log(this.state.propertyIds);
    };
    fetchData();
  }
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router history={browserHistory}>
        {(() => {
          if(this.state.propertyIds.length == 0) {
            setTimeout(function(){console.log("waited")}, 3000);
          }
          else{
            return(<Routes propertyIds = {this.state.propertyIds} />)
          }
        })()}
        </Router>
      </ThemeProvider>
    );
  }
}
