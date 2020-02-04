import React from 'react';
import { PaperBoard } from '../../Components/PaperBoard/PaperBoard';
import { Box, TextField, MenuItem, Select, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { Datepick } from '../../Components/Date/Datepick';

const useStyles = makeStyles(theme => ({
   BoxIn: {
      marginBottom: '10px',
      width: '90%',
      display: 'flex'
   }
}));

const AddEmployee = () => {
   const style = {
      marginRight: '10px'
   };
   const classes = useStyles();
   return (
      <Box
         display='flex'
         alignItems='center'
         flexDirection='column'
         width='100%'
      >
         <Box fontSize='2vw' mb={3}>
            Add Employee
         </Box>
         <PaperBoard>
            <Box
               fontWeight='bold'
               fontSize='1.2vw'
               mb={1}
               display='flex'
               justifyContent='flex-start'
               width='100%'
            >
               Personel Details
            </Box>
            <Box className={classes.BoxIn}>
               <TextField
                  style={style}
                  required
                  fullWidth
                  variant='outlined'
                  label='First Name'
               ></TextField>
               <TextField
                  style={style}
                  fullWidth
                  variant='outlined'
                  label='Middle Name'
               ></TextField>
               <TextField
                  fullWidth
                  variant='outlined'
                  label='Last Name'
               ></TextField>
            </Box>
            <Box className={classes.BoxIn}>
               <Datepick
                  id='1'
                  Name='Date Of Birth'
                  Req='true'
                  marginRight='10px'
               />
               <TextField
                  style={style}
                  fullWidth
                  variant='outlined'
                  label='Age'
                  type='number'
               ></TextField>
               <TextField
                  fullWidth
                  variant='outlined'
                  label='Gender'
               ></TextField>
            </Box>
            <Box className={classes.BoxIn}>
               <TextField
                  style={style}
                  fullWidth
                  variant='outlined'
                  label='Mobile No'
               ></TextField>
               <TextField
                  fullWidth
                  variant='outlined'
                  label='Email'
                  type='email'
               ></TextField>
            </Box>
            <Box className={classes.BoxIn}>
               <TextField
                  fullWidth
                  variant='outlined'
                  label='Address'
               ></TextField>
            </Box>
            <Box className={classes.BoxIn}>
               <Select
                  fullWidth
                  variant='outlined'
                  label='Country'
                  defaultValue=' '
                  style={style}
               >
                  <MenuItem value=' ' disabled>
                     Select Country
                  </MenuItem>
                  <MenuItem value={10}>India</MenuItem>
                  <MenuItem value={20}>America</MenuItem>
               </Select>
               <Select
                  fullWidth
                  variant='outlined'
                  label='State'
                  defaultValue=' '
               >
                  <MenuItem value=' ' disabled>
                     Select State
                  </MenuItem>
                  <MenuItem value={10}>Tamil Nadu</MenuItem>
                  <MenuItem value={20}>Kerala</MenuItem>
               </Select>
            </Box>
            <Box className={classes.BoxIn}>
               <Select
                  fullWidth
                  variant='outlined'
                  label='City'
                  defaultValue=' '
                  style={style}
               >
                  <MenuItem value=' ' disabled>
                     Select City
                  </MenuItem>
                  <MenuItem value={10}>Tirunelveli</MenuItem>
                  <MenuItem value={20}>Tenkasi</MenuItem>
               </Select>
               <TextField
                  fullWidth
                  variant='outlined'
                  label='Postel Code'
               ></TextField>
            </Box>
            <Box
               fontWeight='bold'
               fontSize='1.2vw'
               mb={1}
               display='flex'
               justifyContent='flex-start'
               width='100%'
            >
               Work Details
            </Box>
            <Box className={classes.BoxIn}>
               <TextField
                  style={style}
                  fullWidth
                  variant='outlined'
                  label='Employee ID'
               ></TextField>
               <Datepick id='2' Name='Date Of Joining' />
            </Box>
            <Box className={classes.BoxIn}>
               <Select
                  fullWidth
                  variant='outlined'
                  label='Shift'
                  defaultValue=' '
                  style={style}
               >
                  <MenuItem fontSize='1vw' value=' ' disabled>
                     Select Designation
                  </MenuItem>
                  <MenuItem value={10}>Manager</MenuItem>
                  <MenuItem value={20}>Representative</MenuItem>
               </Select>
               <TextField
                  fullWidth
                  variant='outlined'
                  label='Salary'
                  type='number'
               ></TextField>
            </Box>
            <Box className={classes.BoxIn}>
               <Select
                  fullWidth
                  variant='outlined'
                  label='Shift'
                  defaultValue=' '
                  style={style}
               >
                  <MenuItem value=' ' disabled>
                     Select Work Location
                  </MenuItem>
                  <MenuItem value={10}>Palayamkottai</MenuItem>
                  <MenuItem value={20}>Tenkasi</MenuItem>
               </Select>
               <Select
                  fullWidth
                  variant='outlined'
                  label='Shift'
                  defaultValue=' '
               >
                  <MenuItem value=' ' disabled>
                     Select Shift
                  </MenuItem>
                  <MenuItem value={10}>Morning</MenuItem>
                  <MenuItem value={20}>Night</MenuItem>
                  <MenuItem value={30}>Evening</MenuItem>
               </Select>
            </Box>
            <Box className={classes.BoxIn}>
               <TextField
                  style={style}
                  fullWidth
                  variant='outlined'
                  label='Bank Account Number'
               ></TextField>
               <TextField
                  fullWidth
                  variant='outlined'
                  label='Bank Name'
               ></TextField>
            </Box>
            <Box className={classes.BoxIn}>
               <TextField
                  style={style}
                  fullWidth
                  variant='outlined'
                  label='Branch'
               ></TextField>
               <TextField fullWidth variant='outlined' label='IFSC'></TextField>
            </Box>
         </PaperBoard>
         <Box
            className={classes.BoxIn}
            marginTop='20px'
            justifyContent='flex-end'
         >
            <Button
               variant='contained'
               color='primary'
               className={classes.button}
               endIcon={<AddIcon />}
               size='large'
            >
               Save
            </Button>
         </Box>
      </Box>
   );
};
export default AddEmployee;
