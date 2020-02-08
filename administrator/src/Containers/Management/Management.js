import React from 'react';
import { Box, Button } from '@material-ui/core';
import Dashboard from '../../Components/Dashboard/Dashboard';
import { Routes } from '../../Routes/Routes';
import auth from '../../Components/Auth/auth';

const Management = props => {
   const dashboardList = [
      { Name: 'Manage Employee', Path: 'manage-employee' },
      { Name: 'Manage User', Path: 'manage-users' },
      { Name: 'Manage Role', Path: 'manage-roles' },
      { Name: 'Manage Shift', Path: 'manage-shifts' },
      { Name: 'Manage Product', Path: 'manage-products' },
      { Name: 'Manage Raw Materials', Path: 'manage-raw-materials' },
      { Name: 'Manage Vendors', Path: 'manage-vendors' },
      { Name: 'Manage Distributors', Path: 'manage-distributors' },
      { Name: 'Manage Country', Path: 'manage-countries' },
      { Name: 'Manage State', Path: 'manage-states' },
      { Name: 'Manage City', Path: 'manage-cities' },
      { Name: 'Manage Work Location', Path: 'manage-work-location' },
      { Name: 'Manage Measuring Unit', Path: 'manage-measuring-units' },
      { Name: 'Manage Material Type', Path: 'manage-material-type' },
      { Name: 'Manage Department', Path: 'manage-department' },
      { Name: 'Manage Production Unit', Path: 'manage-production-unit' }
   ];
   return (
      <Box display='flex'>
         <Dashboard items={dashboardList} componentName='management' />
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
                           props.history.push('/');
                        }
                     }}
                  >
                     Logout
                  </Button>
               </Box>
               {props.history.location.state ? (
                  <Box color='red' textAlign='center'>
                     {props.history.location.state.msg}
                  </Box>
               ) : null}
            </Box>
            <Routes />
         </Box>
      </Box>
   );
};

export default Management;
