import React from 'react';
import { Box, Button } from '@material-ui/core';
import Dashboard from '../../Components/Dashboard/Dashboard';
import { Routes } from '../../Routes/Routes';
import auth from '../../Components/Auth/auth';

const Management = props => {
   const dashboardList = [
      { Name: 'Manage Employees', Path: 'manage-employees' },
      { Name: 'Manage Users', Path: 'manage-users' },
      { Name: 'Manage Roles', Path: 'manage-roles' },
      { Name: 'Manage Shifts', Path: 'manage-shifts' },
      { Name: 'Manage Products', Path: 'manage-products' },
      { Name: 'Manage Raw Materials', Path: 'manage-raw-materials' },
      { Name: 'Manage Vendors', Path: 'manage-vendors' },
      { Name: 'Manage Distributors', Path: 'manage-distributors' },
      { Name: 'Manage Countries', Path: 'manage-countries' },
      { Name: 'Manage States', Path: 'manage-states' },
      { Name: 'Manage Cities', Path: 'manage-cities' },
      { Name: 'Manage Work Locations', Path: 'manage-work-locations' },
      { Name: 'Manage Measuring Units', Path: 'manage-measuring-units' },
      { Name: 'Manage Material Types', Path: 'manage-material-types' },
      { Name: 'Manage Departments', Path: 'manage-departments' },
      { Name: 'Manage Production Units', Path: 'manage-production-units' },
      { Name: 'Manage Designations', Path: 'manage-designations' }
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
