import React, { Component } from 'react';
import { Box, Button } from '@material-ui/core';
import Dashboard from '../../Components/Dashboard/Dashboard';
import auth from '../../Components/Auth/auth';

export default class Home extends Component {
   constructor(props) {
      super(props);
      this.dashboardList = [
         { Name: 'Purchase', Path: 'purchase' },
         { Name: 'Finance', Path: 'finance' },
         { Name: 'Production', Path: 'production' },
         { Name: 'Quality Check', Path: 'quality-check' },
         { Name: 'Stock', Path: 'stock' },
         { Name: 'Sales', Path: 'sales' }
      ];
   }

   render() {
      return (
         <Box display='flex'>
            <Dashboard
               items={this.dashboardList}
               componentName='home/reports'
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
               </Box>
            </Box>
         </Box>
      );
   }
}
