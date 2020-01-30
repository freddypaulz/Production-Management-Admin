import React, { Component } from 'react';
import { PaperBoard } from '../PaperBoard/PaperBoard';
import MaterialTable from 'material-table';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ZoomInOutlinedIcon from '@material-ui/icons/ZoomInOutlined';
import axios from 'axios';
import { Box, Button } from '@material-ui/core';

export default class ManageRole extends Component {
   constructor(props) {
      super();
      this.EditData = {};
      this.state = {
         columns: [
            {
               title: 'Actions',
               field: 'Actions',
               cellStyle: {
                  width: 20,
                  maxWidth: 20,
                  textAlign: 'center'
               },
               headerStyle: {
                  width: 40,
                  maxWidth: 40
               },
               render: rowData => (
                  <EditOutlinedIcon
                     style={{ marginRight: '1px' }}
                     onClick={event => {
                        axios
                           .post('/users/management/manage-users', {
                              name: rowData.name
                           })
                           .then(user => {
                              this.EditData = { ...user.data.Users[0] };
                              console.log(this.EditData);
                              this.props.history.push({
                                 pathname: 'manage-users/edit-user',
                                 state: { user: this.EditData }
                              });
                           });
                     }}
                  />
               )
            },
            {
               title: '',
               field: '',
               cellStyle: {
                  width: 50,
                  maxWidth: 50,
                  textAlign: 'center'
               },
               render: rowData => (
                  <ZoomInOutlinedIcon
                     onClick={event => {
                        axios
                           .post('/users/management/manage-users', {
                              name: rowData.name
                           })
                           .then(user => {
                              this.EditData = { ...user.data.Users[0] };
                              console.log(this.EditData);
                              this.props.history.push({
                                 pathname: 'manage-users/edit-user',
                                 state: { user: this.EditData }
                              });
                           });
                     }}
                  />
               )
            },
            { title: 'ID', field: 'id' },
            { title: 'Name', field: 'name' },
            { title: 'Description', field: 'description' }
         ],
         data: []
      };
   }
   componentDidMount() {
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
                     this.props.history.push('manage-roles/edit-role');
                  }}
               >
                  Add Role
               </Button>
            </Box>

            <PaperBoard>
               <MaterialTable
                  title='Manage User'
                  columns={this.state.columns}
                  data={this.state.data}
                  style={{ width: '90%' }}
                  options={{
                     sorting: true,
                     headerStyle: {
                        backgroundColor: '#3f51b5',
                        color: '#FFF'
                     }
                  }}
                  localization={{
                     header: {
                        actions: ''
                     }
                  }}
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
               />
            </PaperBoard>
         </Box>
      );
   }
}
