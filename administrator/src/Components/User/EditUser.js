import React, { Component } from 'react';
import {
   Box,
   TextField,
   Button,
   Select,
   MenuItem,
   FormControl,
   InputLabel
} from '@material-ui/core';
import { PaperBoard } from '../PaperBoard/PaperBoard';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import axios from 'axios';
import Styles from '../styles/FormStyles';

const styles = Styles;
let display = '';
export default class EditUser extends Component {
   constructor(props) {
      super();
      this.state = {
         user_name: '',
         password: '',
         password2: '',
         errors: [],
         success: false,
         role: '',
         Roles: [],
         disable: false
      };
      this.onEditHandler = () => {
         axios
            .post('/users/update-user', {
               name: this.state.user_name,
               password: this.state.password,
               password2: this.state.password2,
               role: this.state.role
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
      axios.get('/roles/roles').then(res => {
         if (this.state.user_name === '' || this.state.role === '') {
            this.setState({
               user_name: this.props.history.location.state.user.name,
               role: this.props.history.location.state.user.role
            });
            console.log(this.state.user_name, this.state.role);
         }
         this.setState({ Roles: res.data.Roles });
         console.log(this.state.Roles);
      });
      this.setState({ disable: this.props.history.location.state.view });
      display = this.props.history.location.state.display;
   }
   render() {
      return (
         <Box style={styles.box}>
            <Box fontSize='30px' mb={3}>
               {this.props.history.location.state.name} User
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
                     disabled={this.state.disable}
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
               {!this.props.history.location.state.view ? (
                  <Box style={{ width: '100%' }}>
                     <Box style={styles.box_field}>
                        <VpnKeyIcon
                           style={styles.icons}
                           color='primary'
                        ></VpnKeyIcon>
                        <TextField
                           disabled={this.state.disable}
                           fullWidth
                           required
                           value={this.state.password}
                           variant='outlined'
                           label='Password'
                           type='password'
                           onChange={event => {
                              this.setState({ password: event.target.value });
                           }}
                        />
                     </Box>

                     <Box style={styles.box_field}>
                        <VpnKeyIcon
                           style={styles.icons}
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
                  </Box>
               ) : null}

               <Box style={styles.box_field}>
                  <AccountBoxOutlinedIcon
                     style={styles.icons}
                     color='primary'
                  ></AccountBoxOutlinedIcon>
                  <FormControl variant='outlined' fullWidth>
                     <InputLabel
                        style={{
                           backgroundColor: 'white',
                           paddingLeft: '2px',
                           paddingRight: '2px'
                        }}
                     >
                        Select Role
                     </InputLabel>
                     <Select
                        disabled={this.state.disable}
                        required
                        value={this.state.role}
                        onChange={event => {
                           console.log(event.target.value);
                           this.setState({
                              role: event.target.value
                           });
                        }}
                     >
                        {this.state.Roles.map((Role, index) => {
                           return (
                              <MenuItem selected key={index} value={Role._id}>
                                 {Role.role_name}
                              </MenuItem>
                           );
                        })}
                     </Select>
                  </FormControl>
               </Box>
            </PaperBoard>
            <Box
               display=' flex'
               marginTop='20px'
               justifyContent='flex-end'
               width='97%'
            >
               <Box
                  marginRight='10px'
                  width='100px'
                  style={{ display: 'flex' }}
               >
                  <Button
                     fullWidth
                     variant='contained'
                     color='primary'
                     size='large'
                     onClick={() => {
                        this.props.history.push('/management/manage-users');
                     }}
                  >
                     {this.props.history.location.state.action}
                  </Button>
               </Box>
               {!this.props.history.location.state.view ? (
                  <Box width='100px' style={{ display: display }}>
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
               ) : null}
            </Box>
         </Box>
      );
   }
}
