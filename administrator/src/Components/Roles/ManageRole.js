import React, { Component } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { Box, Button, Snackbar } from '@material-ui/core';
import MUIAlert from '@material-ui/lab/Alert';

export default class ManageRole extends Component {
   constructor(props) {
      super();
      this.EditData = {};
      this.state = {
         columns: [
            { title: 'ID', field: 'id' },
            { title: 'Role Name', field: 'role_name' },
            { title: 'Description', field: 'description' }
            // { title: 'Permissions', field: 'permissions' }
         ],
         data: [],
         open: false
      };
   }
   componentDidMount() {
      let check = false;
      axios
         .get('/roles/roles')
         .then(res => {
            console.log(res.data);
            for (let i = 0; i < res.data.Roles.length; i++) {
               res.data.Roles[i].id = i + 1;
            }
            this.setState({
               data: [...res.data.Roles]
            });
         })
         .catch(() => {});
      if (!check) {
         check = true;
         console.log(this.props.location.state);
         if (this.props.location.state) {
            console.log(this.props.history.location.state.state.success);
            this.setState({
               open: this.props.history.location.state.state.success
            });
         }
      }
   }
   render() {
      return (
         <Box
            width='100%'
            display='flex'
            alignItems='center'
            flexDirection='column'
         >
            <Box fontSize='30px' mb={3}>
               Manage Role
            </Box>
            <Box width='90%'>
               <Button
                  variant='contained'
                  color='primary'
                  style={{
                     marginBottom: '20px',
                     display: 'flex'
                  }}
                  size='large'
                  onClick={() => {
                     this.props.history.push('manage-roles/add-role');
                  }}
               >
                  Add Role
               </Button>
            </Box>

            <MaterialTable
               title='Manage User'
               columns={this.state.columns}
               data={this.state.data}
               style={{ width: '90%', maxHeight: '500px', overflow: 'auto' }}
               options={{
                  sorting: true,
                  headerStyle: {
                     backgroundColor: '#3f51b5',
                     color: '#FFF'
                  }
               }}
               actions={[
                  {
                     icon: 'edit',
                     tooltip: 'edit Role',
                     onClick: (event, rowData) => {
                        axios
                           .post('/roles/role', {
                              role_name: rowData.role_name
                           })
                           .then(role => {
                              this.EditData = { ...role.data };
                              console.log(this.EditData);
                              this.props.history.push({
                                 pathname: 'manage-roles/edit-role',
                                 state: {
                                    role: { ...this.EditData.Role[0] }
                                 }
                              });
                              console.log('EditData', this.EditData.Role);
                           });
                     }
                  }
               ]}
               editable={{
                  onRowDelete: oldData =>
                     axios
                        .post('/users/management/manage-users/delete-user', {
                           name: oldData.name
                        })
                        .then(User => {
                           console.log(User);
                           if (User) {
                              this.setState(prevState => {
                                 const data = [...prevState.data];
                                 data.splice(data.indexOf(oldData), 1);
                                 return { ...prevState, data };
                              });
                           }
                        })
               }}
               onRowClick={(event, rowData) => {
                  axios
                     .post('/roles/role', {
                        role_name: rowData.role_name
                     })
                     .then(role => {
                        this.EditData = { ...role.data };
                        console.log(this.EditData);
                        this.props.history.push({
                           pathname: 'manage-roles/edit-role',
                           state: {
                              role: { ...this.EditData.Role[0] }
                           }
                        });
                        console.log('EditData', this.EditData.Role);
                     });
               }}
            />
            <Snackbar
               open={this.state.open}
               autoHideDuration={3000}
               onClose={() => {
                  this.setState({ open: false });
               }}
            >
               <MUIAlert
                  onClose={() => {
                     this.setState({ open: false });
                  }}
                  severity='success'
                  elevation={6}
                  variant='filled'
               >
                  Role Updated !
               </MUIAlert>
            </Snackbar>
         </Box>
      );
   }
}
