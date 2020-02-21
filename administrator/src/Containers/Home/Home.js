import React, { Component } from 'react';
import { Box, Button } from '@material-ui/core';
import Dashboard from '../../Components/Dashboard/Dashboard';
import auth from '../../Components/Auth/auth';

export default class Home extends Component {
   constructor(props) {
      super(props);
      this.dashboardList = [
         { Name: 'Management', Path: 'management' },
         { Name: 'Requests', Path: 'requests/finance' },
         { Name: 'Reports', Path: 'reports' }
      ];
   }

   render() {
      return (
         <Box display='flex'>
            <Dashboard items={this.dashboardList} componentName='home' />
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
                        onClick={() => {
                           if (auth.logout()) {
                              this.props.history.push('/');
                           }
                        }}
                     >
                        Logout
                     </Button>
                  </Box>
                  {this.props.history.location.state ? (
                     <Box color='red' textAlign='center'>
                        {this.props.history.location.state.msg}
                     </Box>
                  ) : null}
               </Box>
            </Box>
         </Box>
      );
   }
}
