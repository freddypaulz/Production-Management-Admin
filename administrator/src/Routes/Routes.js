import React from 'react';
import AddUser from '../Components/User/AddUser';
import EditUser from '../Components/User/EditUser';
import AddRole from '../Components/Roles/AddRole';
import EditRole from '../Components/Roles/EditRole';
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
