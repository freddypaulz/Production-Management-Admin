import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { Box, Button, DialogContent } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import axios from 'axios';
import AddEmployee from './AddEmployee';
import EditEmployee from './EditEmployee';
import permissionCheck from '../../Components/Auth/permissionCheck';

export default class ManageEmployees extends Component {
   constructor(props) {
      super();
      this.EditData = {};
      this.state = {
         columns: [
            { title: 'ID', field: 'id' },
            { title: 'Employee First Name', field: 'employee_first_name' },
            { title: 'Employee Last Name', field: 'employee_last_name' },
            { title: 'Employee ID', field: 'employee_id' },
            { title: 'Employee Designation', field: 'employee_designation' },
            {
               title: 'Employee Work Location',
               field: 'employee_work_location'
            },
            { title: 'Employee shift', field: 'employee_shift' }
         ],
         data: [],
         openAdd: false,
         openEdit: false
      };
      this.OnEditHandler = (event, rowData) => {
         console.log(rowData._id);
         axios
            .post('/employees/employee', {
               _id: rowData._id
            })
            .then(res => {
               console.log(res);
               this.EditData = { ...res.data.Employee };
               console.log(this.EditData[0]);
               this.setState({
                  openEdit: true
               });
            });
      };
      this.handleClose = () => {
         axios
            .get('/employees/employees')
            .then(res => {
               //console.log(res.data.States[0].country_id);
               for (let i = 0; i < res.data.Employees.length; i++) {
                  res.data.Employees[i].id = i + 1;
                  axios
                     .post('/work-locations/work-location', {
                        _id: res.data.Employees[i].employee_work_location
                     })
                     .then(WorkLocation => {
                        console.log(WorkLocation);
                        if (WorkLocation.data.WorkLocation[0]) {
                           console.log(
                              WorkLocation.data.WorkLocation[0]
                                 .work_location_name
                           );
                           res.data.Employees[i].employee_work_location =
                              WorkLocation.data.WorkLocation[0].work_location_name;
                           this.setState({
                              data: [...res.data.Employees]
                           });
                        } else {
                           res.data.Employees[i].work_location =
                              'problem loading Work Location';
                           this.setState({
                              data: [...res.data.Employees]
                           });
                        }
                     });
                  axios
                     .post('/shifts/shift', {
                        _id: res.data.Employees[i].employee_shift
                     })
                     .then(Shift => {
                        console.log(Shift);
                        if (Shift.data.shift[0]) {
                           console.log(Shift.data.shift[0].shift_name);
                           res.data.Employees[i].employee_shift =
                              Shift.data.shift[0].shift_name;
                           this.setState({
                              data: [...res.data.Employees]
                           });
                        } else {
                           res.data.Employees[i].shift =
                              'problem loading Shift';
                           this.setState({
                              data: [...res.data.Employees]
                           });
                        }
                     });
                  axios
                     .post('/designations/designation', {
                        _id: res.data.Employees[i].employee_designation
                     })
                     .then(Designation => {
                        console.log(Designation);
                        if (Designation.data.Designation) {
                           console.log(
                              Designation.data.Designation[0].designation_name
                           );
                           res.data.Employees[i].employee_designation =
                              Designation.data.Designation[0].designation_name;
                           this.setState({
                              data: [...res.data.Employees]
                           });
                        } else {
                           res.data.Employees[i].designation =
                              'problem loading Designation';
                           this.setState({
                              data: [...res.data.Employees]
                           });
                        }
                     });
               }
               this.setState({
                  data: [...res.data.Employees]
               });
            })
            .catch(err => {
               console.log('Error');
            });
      };
   }
   componentDidMount() {
      if (permissionCheck(this.props, 'Manage Employees')) {
         this.handleClose();
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
               Manage Employees
            </Box>
            <Box width='90%' display='flex' flexDirection='row'>
               <Button
                  variant='contained'
                  color='primary'
                  style={{
                     marginBottom: '20px',
                     display: 'flex',
                     marginRight: '10px'
                  }}
                  size='large'
                  onClick={() => {
                     this.setState({
                        openAdd: true
                     });
                  }}
               >
                  Add
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
                     tooltip: 'Edit',
                     onClick: (event, rowData) => {
                        this.OnEditHandler(event, rowData);
                     }
                  }
               ]}
               editable={{
                  onRowDelete: oldData =>
                     axios
                        .post('/employees/delete-employee', {
                           _id: oldData._id
                        })
                        .then(res => {
                           console.log(res);
                           if (res) {
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

            <Dialog open={this.state.openAdd} maxWidth='lg' fullWidth>
               <DialogContent style={{ padding: '20px' }}>
                  <AddEmployee
                     cancel={() => {
                        this.setState({
                           openAdd: false
                        });
                        this.handleClose();
                     }}
                  />
               </DialogContent>
            </Dialog>
            <Dialog open={this.state.openEdit} maxWidth='lg' fullWidth>
               <DialogContent style={{ padding: '20px' }}>
                  <EditEmployee
                     Employee={this.EditData[0]}
                     cancel={() => {
                        this.setState({
                           openEdit: false
                        });
                        this.handleClose();
                     }}
                  />
               </DialogContent>
            </Dialog>
         </Box>
      );
   }
}
