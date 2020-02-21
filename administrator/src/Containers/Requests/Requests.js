import React, { Component } from 'react';
import { Box, Button } from '@material-ui/core';
import Dashboard from '../../Components/Dashboard/Dashboard';
import auth from '../../Components/Auth/auth';
import { Route } from 'react-router-dom';
import ManagePurchase from './Finance/ManageFinance';

export default class Requests extends Component {
   constructor(props) {
      super(props);
      this.dashboardList = [{ Name: 'Finance', Path: 'finance' }];
   }

   render() {
      return (
         <Box display='flex'>
            <Dashboard
               items={this.dashboardList}
               componentName='home/requests'
            />
            <Box
               display='flex'
               flexDirection='column'
               alignItems='center'
               width='100%'
               marginTop='10px'
            >
               <Box
                  width='90%'
                  display='flex'
                  justifyContent='center'
                  flexDirection='column'
               >
                  <Box width='100%' display='flex' justifyContent='flex-end'>
                     <Button
                        variant='contained'
                        color='primary'
                        style={{ marginRight: '10px' }}
                        onClick={() => {
                           this.props.history.push('/home');
                        }}
                     >
                        Home
                     </Button>
                     <Button
                        variant='contained'
                        color='primary'
                        onClick={() => {
                           if (auth.logout()) {
                              this.props.history.push('/');
                           }
                        }}
                     >
                        Logout
                     </Button>
                  </Box>
                  {/* {this.props.history.location.state ? (
                     <Box color='red' textAlign='center'>
                        {this.props.history.location.state.msg}
                     </Box>
                  ) : null} */}
               </Box>
               {/* Routes */}
               <Route
                  exact
                  path='/home/requests/finance'
                  component={ManagePurchase}
               />
            </Box>
         </Box>
      );
   }
}
