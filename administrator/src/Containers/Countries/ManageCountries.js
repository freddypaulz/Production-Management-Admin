import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { Box, Button } from '@material-ui/core';
import axios from 'axios';
import permissionCheck from '../../Components/Auth/permissionCheck';

export default class ManageUser extends Component {
   constructor(props) {
      super();
      this.EditData = {};
      this.state = {
         columns: [
            { title: 'ID', field: 'id' },
            { title: 'Country Name', field: 'country_name' },
            { title: 'Description', field: 'description' }
         ],
         data: []
      };
      this.OnEditHandler = (event, rowData) => {
         axios
            .post('/countries/country', {
               _id: rowData._id
            })
            .then(country => {
               //console.log(country);
               this.EditData = { ...country.data.Country[0] };
               console.log(this.EditData);
               this.props.history.push({
                  pathname: 'manage-countries/edit-country',
                  state: {
                     country: this.EditData
                  }
               });
            });
      };
   }
   componentDidMount() {
      if (permissionCheck(this.props, 'Manage Country')) {
         axios.get('/countries/countries').then(res => {
            console.log(res.data);
            for (let i = 0; i < res.data.Countries.length; i++) {
               res.data.Countries[i].id = i + 1;
            }
            this.setState({
               data: [...res.data.Countries]
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
               Manage Countries
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
                     this.props.history.push('manage-countries/add-country');
                  }}
               >
                  Add Countries
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
                        .post('/countries/delete-country', {
                           country_name: oldData.country_name
                        })
                        .then(Country => {
                           console.log(Country);
                           if (Country) {
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
