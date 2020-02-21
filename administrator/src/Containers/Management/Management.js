import React from 'react';
import { Box, Button } from '@material-ui/core';
import Dashboard from '../../Components/Dashboard/Dashboard';
import { Routes } from '../../Routes/Routes';
import auth from '../../Components/Auth/auth';
class Management extends React.Component {
   constructor(props) {
      super();
      this.state = {
         dashboardItems: []
      };
      this.permissions = JSON.parse(sessionStorage.getItem('permissions'));
   }
   componentDidMount() {
      console.log(this.permissions);
      this.permissions.map(permission => {
         let path = permission.toLowerCase().replace(/ /g, '-');
         console.log(path);
         this.setState({});
         this.setState(prevState => {
            prevState.dashboardItems.push({
               Name: permission,
               Path: path
            });
         });
         return null;
      });
      console.log(this.state.dashboardItems, this.dashboardList);
   }
   render() {
      return (
         <Box display='flex'>
            <Dashboard
               items={this.state.dashboardItems}
               componentName='home/management'
            />
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
                        style={{ marginRight: '10px' }}
                        onClick={() => {
                           this.props.history.push('/home');
                        }}
                     >
                        Home
                     </Button>
                     <Button
                        variant='contained'
                        color='primary'
                        onClick={() => {
                           if (auth.logout()) {
                              this.props.history.push('/');
                           }
                        }}
                     >
                        Logout
                     </Button>
                  </Box>
               </Box>
               <Routes />
            </Box>
         </Box>
      );
   }
}

export default Management;
