import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { Box, Button } from '@material-ui/core';
import axios from 'axios';
import permissionCheck from '../../Components/Auth/permissionCheck';

export default class ManageShift extends Component {
   constructor(props) {
      super();
      this.EditData = {};
      this.state = {
         columns: [
            { title: 'ID', field: 'id' },
            { title: 'Shift Name', field: 'shift_name' },
            { title: 'Description', field: 'description' }
         ],
         data: []
      };
      this.OnEditHandler = (event, rowData) => {
         axios
            .post('/shifts/shift', {
               _id: rowData._id
            })
            .then(shift => {
               console.log(shift);
               this.EditData = { ...shift.data.shift[0] };
               console.log(this.EditData);
               this.props.history.push({
                  pathname: 'manage-shifts/edit-shift',
                  state: {
                     shift: this.EditData
                  }
               });
            });
      };
   }
   componentDidMount() {
      if (permissionCheck(this.props, 'Manage Shift')) {
         axios.get('/shifts/shifts').then(res => {
            console.log(res.data);
            for (let i = 0; i < res.data.Shifts.length; i++) {
               res.data.Shifts[i].id = i + 1;
            }
            this.setState({
               data: [...res.data.Shifts]
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
               Manage Shift
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
                     this.props.history.push('manage-shifts/add-shift');
                  }}
               >
                  Add Shift
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
                        .post('/shifts/delete-shift', {
                           shift_name: oldData.shift_name
                        })
                        .then(Shift => {
                           console.log(Shift);
                           if (Shift) {
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
