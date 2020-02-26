import React, { Component } from 'react';
import { Box, Button } from '@material-ui/core';
import Dashboard from '../../Components/Dashboard/Dashboard';
import auth from '../../Components/Auth/auth';
import Purchase from './Purchase/Purchase';
import { Route } from 'react-router-dom';
import AppBar from '../../Components/AppBar/AppBar';

export default class Home extends Component {
   constructor(props) {
      super(props);
      this.state = {
         width: '17vw'
      };
      this.dashboardList = [
         { Name: 'Purchase', Path: 'purchase' },
         { Name: 'Finance', Path: 'finance' },
         { Name: 'Production', Path: 'production' },
         { Name: 'Quality Check', Path: 'quality-check' },
         { Name: 'Stock', Path: 'stock' },
         { Name: 'Sales', Path: 'sales' }
      ];
      this.logout = () => {
         if (auth.logout()) {
            this.props.history.push('/');
         }
      };
      this.home = () => {
         this.props.history.push('/home');
      };
      this.dashboardMin = () => {
         this.setState({
            width: '.1px'
         });
      };
      this.dashboardMax = () => {
         this.setState({
            width: '17vw'
         });
      };
   }

   render() {
      return (
         <Box>
            <AppBar
               name='Reports'
               logout={this.logout}
               home={this.home}
               dashboardMax={this.dashboardMax}
               dashboardMin={this.dashboardMin}
            />
            <Box display='flex'>
               <Dashboard
                  items={this.dashboardList}
                  componentName='home/reports'
                  width={this.state.width}
                  dashboardMin={this.dashboardMin}
               />
               <Box
                  display='flex'
                  flexDirection='column'
                  alignItems='center'
                  width='100%'
                  marginTop='10px'
               >
                  <Route
                     exact
                     path='/home/reports/purchase'
                     component={Purchase}
                  />
               </Box>
            </Box>
         </Box>
      );
   }
}
