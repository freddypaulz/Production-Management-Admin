import React, { Component } from 'react';
import { Box, TextField, Button } from '@material-ui/core';
import { PaperBoard } from '../PaperBoard/PaperBoard';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import axios from 'axios';

const styles = {
   box: {
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '20px'
   }
};
export default class Register extends Component {
   constructor() {
      super();
      this.state = {
         user_name: '',
         password: '',
         password2: '',
         errors: [],
         success: false
      };
   }
   render() {
      return (
         <Box
            flexDirection='column'
            height='100vh'
            bgcolor='#eee'
            style={styles.box}
         >
            <Box width='30vw'>
               <PaperBoard>
                  <Box fontSize='30px' mb={3}>
                     Register User
                  </Box>
                  <Box style={styles.box}>
                     <AccountBoxOutlinedIcon
                        style={{ fontSize: '40px', marginRight: '10px' }}
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
                  <Box style={styles.box}>
                     <VpnKeyIcon
                        style={{ fontSize: '40px', marginRight: '10px' }}
                        color='primary'
                     ></VpnKeyIcon>
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
                  <Box style={styles.box}>
                     <VpnKeyIcon
                        style={{ fontSize: '40px', marginRight: '10px' }}
                        color='primary'
                     ></VpnKeyIcon>
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
                  <Button
                     variant='contained'
                     color='primary'
                     size='large'
                     onClick={() => {
                        axios
                           .post('/users/register', {
                              name: this.state.user_name,
                              password: this.state.password,
                              password2: this.state.password2
                           })
                           .then(res => {
                              console.log(res);
                              if (res.data.errors.length > 0) {
                                 console.log(res.data.errors);
                                 this.setState({
                                    errors: [...res.data.errors],
                                    success: false
                                 });
                              } else {
                                 this.setState({
                                    user_name: '',
                                    password: '',
                                    password2: '',
                                    errors: '',
                                    success: true
                                 });
                              }
                           })
                           .catch(err => console.log(err));
                     }}
                  >
                     Register
                  </Button>
                  {this.state.errors.length > 0 ? (
                     this.state.errors.map((error, index) => {
                        return (
                           <Box
                              key={index}
                              bgcolor='#f73067'
                              marginTop='10px'
                              padding='10px'
                              width='90%'
                              textAlign='center'
                           >
                              {error}
                           </Box>
                        );
                     })
                  ) : this.state.success === true ? (
                     <Box
                        bgcolor='#3df45b'
                        marginTop='10px'
                        padding='10px'
                        width='90%'
                        textAlign='center'
                     >
                        Registration Successful
                     </Box>
                  ) : (
                     <Box></Box>
                  )}
               </PaperBoard>
            </Box>
            {/* {this.state.customers ? (
               this.state.customers.map((customer, index) => {
                  return <Box key={index}>{customer.data}</Box>;
               })
            ) : (
               <h1>Loading...</h1>
            )} */}
         </Box>
      );
   }
}
