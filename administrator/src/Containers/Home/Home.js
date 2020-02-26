import React, { Component } from 'react';
import { Box, Button } from '@material-ui/core';
import Dashboard from '../../Components/Dashboard/Dashboard';
import auth from '../../Components/Auth/auth';
import AppBar from '../../Components/AppBar/AppBar';

export default class Home extends Component {
   constructor(props) {
      super(props);
      this.state = {
         width: '17vw'
      };
      this.dashboardList = [
         { Name: 'Management', Path: 'management' },
         { Name: 'Requests', Path: 'requests/finance' },
         { Name: 'Reports', Path: 'reports' }
      ];
      this.logout = () => {
         if (auth.logout()) {
            this.props.history.push('/');
         }
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
               name='Home'
               logout={this.logout}
               homeButtonDisable={true}
               dashboardMax={this.dashboardMax}
               dashboardMin={this.dashboardMin}
            />
            <Box>
               <Dashboard
                  items={this.dashboardList}
                  componentName='home'
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
                  <Box
                     width='90%'
                     display='flex'
                     justifyContent='center'
                     flexDirection='column'
                  >
                     {this.props.history.location.state ? (
                        <Box color='red' textAlign='center'>
                           {this.props.history.location.state.msg}
                        </Box>
                     ) : null}
                  </Box>
               </Box>
            </Box>
         </Box>
      );
   }
}
