import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { Box, Button } from '@material-ui/core';
import axios from 'axios';
import permissionCheck from '../../Components/Auth/permissionCheck';

export default class ManageEmployee extends Component {
   constructor(props) {
      super();
      this.EditData = {};
      this.state = {
         columns: [
            { title: 'ID', field: 'id' },
            { title: 'Name', field: 'name' }
         ],
         data: []
      };
      this.OnEditHandler = (event, rowData) => {
         axios
            .post('/users/user', {
               name: rowData.name
            })
            .then(user => {
               this.EditData = { ...user.data.Users[0] };
               console.log(this.EditData);
               this.props.history.push({
                  pathname: 'manage-users/edit-user',
                  state: {
                     user: this.EditData
                  }
               });
            });
      };
   }
   componentDidMount() {
      if (permissionCheck(this.props, 'Manage Employee')) {
         axios.get('/users/users').then(res => {
            console.log(res.data);
            for (let i = 0; i < res.data.Users.length; i++) {
               res.data.Users[i].id = i + 1;
            }
            this.setState({
               data: [...res.data.Users]
            });
         });
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
               Manage Employee
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
                     this.props.history.push('manage-users/add-user');
                  }}
               >
                  Add Employee
               </Button>
            </Box>

            <MaterialTable
               title=' '
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
                     tooltip: 'Edit User',
                     onClick: (event, rowData) => {
                        this.OnEditHandler(event, rowData);
                     }
                  }
               ]}
               editable={{
                  onRowDelete: oldData =>
                     axios
                        .post('/users/delete-user', {
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
                  this.OnEditHandler(event, rowData);
               }}
            />
         </Box>
      );
   }
}
