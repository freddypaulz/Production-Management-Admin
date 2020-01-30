import React, { Component } from 'react';
import {
   Box,
   TextField,
   Button,
   Checkbox,
   FormControlLabel
} from '@material-ui/core';
import { PaperBoard } from '../PaperBoard/PaperBoard';
import axios from 'axios';
import Styles from '../styles/FormStyles';

const styles = Styles;

export default class AddUser extends Component {
   constructor(props) {
      super();
      this.state = {
         user_name: '',
         password: '',
         password2: '',
         errors: [],
         success: false,
         permissions: [
            { name: 'read', value: false },
            { name: 'write', value: false }
         ]
      };
      this.onAddHandler = () => {
         axios
            .post('/users/add-user', {
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
                     role_name: '',
                     description: '',
                     permissions: [],
                     errors: '',
                     success: true
                  });
                  this.props.history.push('/management/manage-users');
               }
            })
            .catch(err => console.log(err));
      };
      this.checkHandleChange = value => event => {
         this.setState({ [value]: event.target.checked });
      };
   }

   render() {
      return (
         <Box style={styles.box}>
            <Box fontSize='30px' mb={3}>
               Add Role
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
                  <TextField
                     fullWidth
                     required
                     value={this.state.user_name}
                     variant='outlined'
                     label='Role Name'
                     type='text'
                     onChange={event => {
                        this.setState({ role_name: event.target.value });
                     }}
                  ></TextField>
               </Box>
               <Box style={styles.box_field}>
                  <TextField
                     fullWidth
                     multiline
                     value={this.state.password}
                     variant='outlined'
                     label='Description'
                     type='text'
                     onChange={event => {
                        this.setState({ description: event.target.value });
                     }}
                  ></TextField>
               </Box>
               <Box
                  fontWeight='bold'
                  fontSize='20px'
                  mb={1}
                  display='flex'
                  justifyContent='flex-start'
                  width='100%'
               >
                  Permissions
               </Box>
               <Box width='100%'>
                  {this.state.permissions.map((permission, index) => {
                     return (
                        <FormControlLabel
                           key={index}
                           control={
                              <Checkbox
                                 checked={permission.value}
                                 onClick={e => {
                                    permission.value = !permission.value;
                                    this.setState({
                                       permissions: [...this.state.permissions]
                                    });
                                    console.log(this.state.permissions);
                                 }}
                                 value={`${permission.name}`}
                              />
                           }
                           label={`${permission.name}`}
                        />
                     );
                  })}
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
                        this.props.history.push('/management/manage-roles');
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
                     onClick={this.onAddHandler}
                  >
                     Add
                  </Button>
               </Box>
            </Box>
         </Box>
      );
   }
}
