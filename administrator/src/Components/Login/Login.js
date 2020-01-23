import React, { useState, Component } from 'react';
import { Box, TextField, Button } from '@material-ui/core';
import { PaperBoard } from '../PaperBoard/PaperBoard';
import { makeStyles } from '@material-ui/core/styles';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
      axios.get('/api/customers').then(res => {
         this.setState({ customers: [...res.data] });
         console.log(this.state.customers);
      });
   }
   constructor() {
      super();
      this.state = {
         customers: null,
         user_name: '',
         password: ''
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
                        if (
                           this.state.user_name === 'freddy' &&
                           this.state.password === 'pass'
                        ) {
                           window.location.href = '/management';
                        }
                     }}
                  >
                     Login
                  </Button>
               </PaperBoard>
            </Box>
            {console.log(this.state.customers)}
            {this.state.customers ? (
               this.state.customers.map((customer, index) => {
                  return <Box key={index}>{customer.data}</Box>;
               })
            ) : (
               <h1>Loading...</h1>
            )}
         </Box>
      );
   }
}
