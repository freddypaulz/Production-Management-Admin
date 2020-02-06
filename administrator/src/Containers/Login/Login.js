import React, { Component } from 'react';
import { Box, TextField, Button } from '@material-ui/core';
import { PaperBoard } from '../../Components/PaperBoard/PaperBoard';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import axios from 'axios';
import auth from '../../Components/Auth/auth';

const styles = {
   box: {
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '20px'
   }
};

export default class Login extends Component {
   componentDidMount() {
      auth.logout();
   }
   constructor(props) {
      super(props);
      this.state = {
         user_name: '',
         password: '',
         success: false,
         errors: []
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
                  <Box fontSize='2vw' mb={3}>
                     WELCOME
                  </Box>
                  <Box style={styles.box}>
                     <AccountBoxOutlinedIcon
                        style={{ fontSize: '40px', marginRight: '10px' }}
                        color='primary'
                     ></AccountBoxOutlinedIcon>
                     <TextField
                        fullWidth
                        required
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
                        variant='outlined'
                        fullWidth
                        label='Password'
                        required
                        type='password'
                        onChange={event => {
                           this.setState({ password: event.target.value });
                        }}
                     ></TextField>
                  </Box>
                  <Button
                     variant='contained'
                     color='primary'
                     size='large'
                     onClick={() => {
                        axios
                           .post('/users/login', {
                              name: this.state.user_name,
                              password: this.state.password
                           })
                           .then(res => {
                              if (res.data.name === this.state.user_name) {
                                 auth.login(
                                    res.data.name === this.state.user_name
                                 );
                                 axios
                                    .post('roles/role', {
                                       _id: res.data.role
                                    })
                                    .then(res => {
                                       let permissions = [];
                                       console.log(res.data);
                                       res.data.Role[0].permissions.map(
                                          permission => {
                                             permissions.push(permission.name);
                                             return null;
                                          }
                                       );
                                       sessionStorage.setItem(
                                          'permissions',
                                          JSON.stringify(permissions)
                                       );
                                       this.props.history.push('/management');
                                    })
                                    .catch(err => {
                                       console.log(err);
                                       this.setState({
                                          errors: [
                                             'Problem in user. Contact Administrator'
                                          ]
                                       });
                                    });
                              } else {
                                 console.log(res.data.message);
                                 this.setState({
                                    errors: res.data.message
                                 });
                              }
                           })
                           .catch(err => {
                              this.setState({
                                 errors: ['Could not reach the server']
                              });
                              console.log(err);
                           });
                     }}
                  >
                     Login
                  </Button>
                  {this.state.errors.length > 0 ? (
                     this.state.errors.map((error, index) => {
                        return error != null ? (
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
                        ) : (
                           <Box key={index}></Box>
                        );
                     })
                  ) : (
                     <Box></Box>
                  )}
               </PaperBoard>
            </Box>
         </Box>
      );
   }
}
