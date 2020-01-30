import React, { Component } from 'react';
import { Box, TextField, Button } from '@material-ui/core';
import { PaperBoard } from '../PaperBoard/PaperBoard';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import axios from 'axios';

const styles = {
   box_field: {
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '20px'
   },
   box: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column'
   },
   box_msg: {
      marginBottom: '10px',
      padding: '10px',
      width: '90%',
      textAlign: 'center',
      fontSize: '15px',
      textTransform: 'uppercase '
   },
   icons: {
      fontSize: '40px',
      marginRight: '10px'
   }
};

export default class EditUser extends Component {
   constructor(props) {
      super();
      this.state = {
         user_name: '',
         password: '',
         password2: '',
         errors: [],
         success: false
      };
      this.onEditHandler = () => {
         axios
            .post('/users/update-user', {
               name: this.state.user_name,
               password: this.state.password,
               password2: this.state.password2
            })
            .then(res => {
               console.log(res);
               if (res.data.errors) {
                  if (res.data.errors.length > 0) {
                     console.log(res.data.errors);
                     this.setState({
                        errors: [...res.data.errors],
                        success: false
                     });
                  }
               } else {
                  this.setState({
                     user_name: '',
                     password: '',
                     password2: '',
                     errors: '',
                     success: true
                  });
                  this.props.history.push('/management/manage-users');
               }
            })
            .catch(err => console.log(err));
      };
   }
   componentDidMount() {
      console.log(this.props.history.location.state.user);
      if (this.state.user_name === '') {
         this.setState({
            user_name: this.props.history.location.state.user.name
         });
      }
   }
   render() {
      return (
         <Box style={styles.box}>
            <Box fontSize='30px' mb={3}>
               Edit User
            </Box>
            {this.state.errors.length > 0 ? (
               this.state.errors.map((error, index) => {
                  return (
                     <Box style={styles.box_msg} bgcolor='#f73067' key={index}>
                        {error}
                     </Box>
                  );
               })
            ) : this.state.success === true ? (
               <Box bgcolor='#3df45b' style={styles.box_msg}>
                  Registration Successful
               </Box>
            ) : (
               <Box></Box>
            )}
            <PaperBoard>
               <Box style={styles.box_field}>
                  <AccountBoxOutlinedIcon
                     style={styles.icons}
                     color='primary'
                  ></AccountBoxOutlinedIcon>

                  <TextField
                     fullWidth
                     required
                     value={this.state.user_name}
                     variant='outlined'
                     label='User Name'
                     type='text'
                     onChange={event => {
                        this.setState({ user_name: event.target.value });
                     }}
                  ></TextField>
               </Box>
               <Box style={styles.box_field}>
                  <VpnKeyIcon style={styles.icons} color='primary'></VpnKeyIcon>
                  <TextField
                     fullWidth
                     required
                     value={this.state.password}
                     variant='outlined'
                     label='Password'
                     type='password'
                     onChange={event => {
                        this.setState({ password: event.target.value });
                     }}
                  ></TextField>
               </Box>
               <Box style={styles.box_field}>
                  <VpnKeyIcon style={styles.icons} color='primary'></VpnKeyIcon>
                  <TextField
                     fullWidth
                     required
                     value={this.state.password2}
                     variant='outlined'
                     label='Confirm Password'
                     type='password'
                     onChange={event => {
                        this.setState({ password2: event.target.value });
                     }}
                  ></TextField>
               </Box>
            </PaperBoard>
            <Box
               display=' flex'
               marginTop='20px'
               justifyContent='flex-end'
               width='90%'
            >
               <Box marginRight='10px' width='100px'>
                  <Button
                     fullWidth
                     variant='contained'
                     color='primary'
                     size='large'
                     onClick={() => {
                        this.props.history.push('/management/manage-users');
                     }}
                  >
                     Cancel
                  </Button>
               </Box>
               <Box width='100px'>
                  <Button
                     fullWidth
                     variant='contained'
                     color='primary'
                     size='large'
                     onClick={this.onEditHandler}
                  >
                     Update
                  </Button>
               </Box>
            </Box>
         </Box>
      );
   }
}
