import React from 'react';
import AddUser from '../Containers/User/AddUser';
import EditUser from '../Containers/User/EditUser';
import AddRole from '../Containers/Roles/AddRole';
import EditRole from '../Containers/Roles/EditRole';
import AddShift from '../Containers/Shift/AddShift';
import EditShift from '../Containers/Shift/EditShift';
import AddCountry from '../Containers/Countries/AddCountry';
import EditCountry from '../Containers/Countries/EditCountry';
import { Route } from 'react-router-dom';

export const AddUserRoute = () => {
   return (
      <Route path='/management/manage-users/add-user' component={AddUser} />
   );
};

export const EditUserRoute = () => {
   return (
      <Route path='/management/manage-users/edit-user' component={EditUser} />
   );
};
export const AddRoleRoute = () => {
   return (
      <Route path='/management/manage-roles/add-role' component={AddRole} />
   );
};
export const EditRoleRoute = () => {
   return (
      <Route path='/management/manage-roles/edit-role' component={EditRole} />
   );
};
export const AddShiftRoute = () => {
   return (
      <Route path='/management/manage-shifts/add-shift' component={AddShift} />
   );
};
export const EditShiftRoute = () => {
   return (
      <Route
         path='/management/manage-shifts/edit-shift'
         component={EditShift}
      />
   );
};
export const AddCountryRoute = () => {
   return (
      <Route
         path='/management/manage-countries/add-country'
         component={AddCountry}
      />
   );
};
export const EditCountryRoute = () => {
   return (
      <Route
         path='/management/manage-countries/edit-country'
         component={EditCountry}
      />
   );
};
