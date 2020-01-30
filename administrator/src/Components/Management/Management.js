import React from 'react';
import { Box } from '@material-ui/core';
import Dashboard from '../Dashboard/Dashboard';
import AddEmployee from '../Employee/AddEmployee';
import AddUser from '../User/AddUser';
import { Route } from 'react-router';
import ManageEmployee from '../Employee/ManageEmployee';
import ManageUser from '../User/ManageUser';
import ManageRole from '../Roles/ManageRole';
import { AddUserRoute, EditUserRoute, AddRoleRoute } from '../../Routes/Routes';

const Management = () => {
   const dashboardList = [
      { Name: 'Manage Employee', Path: 'manage-employee' },
      { Name: 'Manage Product', Path: 'manage-products' },
      { Name: 'Manage Raw Materials', Path: 'manage-raw-materials' },
      { Name: 'Managse Vendors', Path: 'manage-vendors' },
      { Name: 'Manage Distributors', Path: 'manage-distributors' },
      { Name: 'Manage Country', Path: 'manage-country' },
      { Name: 'Manage State', Path: 'manage-state' },
      { Name: 'Manage City', Path: 'manage-city' },
      { Name: 'Manage Work Location', Path: 'manage-work-location' },
      { Name: 'Manage Shift', Path: 'manage-shift' },
      { Name: 'Manage Measuring Unit', Path: 'manage-measuring-unit' },
      { Name: 'Manage Material Type', Path: 'manage-material-type' },
      { Name: 'Manage User', Path: 'manage-users' },
      { Name: 'Manage Role', Path: 'manage-roles' },
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
            marginTop='20px'
         >
            <Route
               path='/management/manage-employee'
               component={ManageEmployee}
            />
            <Route path='/management/manage-products' component={AddEmployee} />
            <Route
               exact
               path='/management/manage-users'
               component={ManageUser}
            />
            <Route
               exact
               path='/management/manage-roles'
               component={ManageRole}
            />
            <AddUserRoute />
            <EditUserRoute />
            <AddRoleRoute />
         </Box>
      </Box>
   );
};

export default Management;
