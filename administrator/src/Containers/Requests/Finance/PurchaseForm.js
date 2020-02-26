import React, { useState, useEffect } from 'react';
import {
   Box,
   TextField,
   Select,
   MenuItem,
   Button,
   FormControl,
   InputLabel
} from '@material-ui/core';
import useStyles from './PurchaseFormstyles';
import { Datepick } from '../../../Components/Date/Datepick';
import Axios from 'axios';

const style = {
   marginRight: '20px'
};
const PurchaseForm = props => {
   const classes = useStyles();
   const [state, setState] = useState({
      vendorsList: [],
      reqDetails: {
         quantity: props.data.Quantity,
         munit: props.data.Measuring_Unit,
         vendor: props.data.Vendor,
         amount: props.data.Total_Price,
         quotationURL: props.data.Quotation_Document_URL,
         status: props.data.Status
      }
   });
   useEffect(() => {
      Axios.get('/vendors/vendors').then(res => {
         setState({ ...state, vendorsList: res.data.Vendors });
         console.log(state.vendorsList);
         if (props.action === 'Edit') {
            setState(state => ({
               ...state,
               reqDetails: {
                  quantity: props.data.Quantity,
                  munit: props.data.Measuring_Unit,
                  vendor: props.data.Vendor,
                  amount: props.data.Total_Price,
                  quotationURL: props.data.Quotation_Document_URL,
                  status: props.data.Status
               }
            }));
            console.log('Edit working...');
         }
      });
   }, [props.data, props.action]);

   useEffect(
      () => {
         console.log(state.reqDetails);
      }
      // , [state.reqDetails]
   );

   // var qURL = [];
   // const childState = url => {
   //    qURL = url;
   // };
   const onCancel = () => {
      var amount = document.getElementsByName('amount')[0].value;
      if (
         // qURL.length === 0 ||
         amount <= 0 ||
         isNaN(amount)
      ) {
         setState(state => ({
            ...state,
            quantity: props.data.Quantity,
            munit: props.data.Measuring_Unit,
            amount: props.data.Total_Price,
            vendor: props.data.Vendor,
            // quotationURL: props.data.Quotation_Document_URL,
            status: props.data.Status
         }));
      }
      props.handler(props.data, 0);
   };
   const onSubmit = () => {
      console.log('onSubmit: ', state.reqDetails);
      var amount = document.getElementsByName('amount')[0].value;
      var quantity = document.getElementsByName('quantity')[0].value;
      if (
         //qURL.length === 0 ||
         amount <= 0 ||
         isNaN(amount) ||
         quantity <= 0 ||
         isNaN(quantity)
      ) {
         alert('Check properly');
         // setState(state => ({
         //    ...state,
         //    quotationURL: props.data.Quotation_Document_URL
         // }));
      } else {
         Axios.post('/request-details/request-details', {
            Edit: {
               _id: props.data._id,
               quantity: state.reqDetails.quantity,
               munit: state.reqDetails.munit,
               vendor: state.reqDetails.vendor,
               amount: state.reqDetails.amount,
               //quotationURL: qURL,
               status: state.reqDetails.status
            }
         }).then(
            // console.log('Updated: ', state.reqDetails, qURL),
            props.handler(props.data, 1)
         );
      }
   };
   const setValue = event => {
      setState({
         ...state,
         reqDetails: {
            quantity:
               event.target.name === 'quantity'
                  ? event.target.value
                  : document.getElementsByName('quantity')[0].value,
            munit:
               event.target.name === 'munit'
                  ? event.target.value
                  : document.getElementsByName('munit')[0].value,
            vendor:
               event.target.name === 'vendor'
                  ? event.target.value
                  : document.getElementsByName('vendor')[0].value,
            amount:
               event.target.name === 'amount'
                  ? event.target.value
                  : document.getElementsByName('amount')[0].value,
            status:
               event.target.name === 'status'
                  ? event.target.value
                  : document.getElementsByName('status')[0].value
         }
      });
   };

   const loadVendors = () => {
      return state.vendorsList.map((person, index) => (
         <MenuItem key={index} value={person._id}>
            {person.vendor_name}
         </MenuItem>
      ));
   };

   const Form = (
      <Box className={classes.form}>
         <Box className={classes.boxSize2}>
            <FormControl
               fullWidth
               variant='outlined'
               size='small'
               style={style}
               required
            >
               <InputLabel
                  style={{
                     backgroundColor: 'white',
                     paddingLeft: '5px',
                     paddingRight: '5px'
                  }}
               >
                  Material Name
               </InputLabel>
               <Select
                  name='rmname'
                  fullWidth
                  variant='outlined'
                  value={props.data.Raw_Material_Name}
                  disabled
                  required
               >
                  <MenuItem value='Raw Material Name' disabled>
                     Raw Material Name
                  </MenuItem>
                  <MenuItem value='Apple'>Apple</MenuItem>
                  <MenuItem value='Mango'>Mango</MenuItem>
                  <MenuItem value='Orange'>Orange</MenuItem>
               </Select>
            </FormControl>

            <TextField
               name='rmid'
               size='small'
               fullWidth
               variant='outlined'
               label='Material Code'
               value={props.data.Raw_Material_Id}
               required
               disabled
            ></TextField>
         </Box>

         <Box className={classes.boxSize2}>
            <TextField
               name='quantity'
               size='small'
               style={style}
               fullWidth
               value={state.reqDetails.quantity}
               variant='outlined'
               label='Material Quantity'
               onChange={event => setValue(event)}
            ></TextField>

            <FormControl fullWidth variant='outlined' size='small' required>
               <InputLabel
                  style={{ backgroundColor: 'white', padding: '0 5px' }}
               >
                  Measuring Unit
               </InputLabel>
               <Select
                  name='munit'
                  fullWidth
                  variant='outlined'
                  value={state.reqDetails.munit}
                  required
                  onChange={event => setValue(event)}
               >
                  <MenuItem value='Measuring_Unit'>Measuring Unit</MenuItem>
                  <MenuItem value='kg'>kg</MenuItem>
                  <MenuItem value='ltr'>ltr</MenuItem>
                  <MenuItem value='ton'>ton</MenuItem>
               </Select>
            </FormControl>
         </Box>

         <Box className={classes.boxSize2}>
            <FormControl
               fullWidth
               variant='outlined'
               size='small'
               style={style}
               required
            >
               <InputLabel
                  style={{ backgroundColor: 'white', padding: '0 5px' }}
               >
                  Vendor
               </InputLabel>
               <Select
                  name='vendor'
                  variant='outlined'
                  value={state.reqDetails.vendor}
                  onChange={event => setValue(event)}
                  required
               >
                  <MenuItem value='Vendor' disabled selected>
                     Vendor
                  </MenuItem>
                  {loadVendors()}
               </Select>
            </FormControl>

            <TextField
               name='amount'
               size='small'
               fullWidth
               variant='outlined'
               label='Total Price'
               value={state.reqDetails.amount}
               onChange={event => setValue(event)}
            ></TextField>
         </Box>

         <Box className={classes.boxSize2}>
            <FormControl
               fullWidth
               variant='outlined'
               size='small'
               style={style}
               required
            >
               <InputLabel
                  style={{ backgroundColor: 'white', padding: '0 2px' }}
               >
                  Priority
               </InputLabel>
               <Select
                  name='priority'
                  fullWidth
                  variant='outlined'
                  value={props.data.Priority}
                  required
                  disabled
               >
                  <MenuItem value='Priority' disabled>
                     Priority
                  </MenuItem>
                  <MenuItem value='Low'>Low</MenuItem>
                  <MenuItem value='Medium'>Medium</MenuItem>
                  <MenuItem value='High'>High</MenuItem>
               </Select>
            </FormControl>

            <Box
               width='100%'
               disabled
               style={{ position: 'relative', bottom: '5px' }}
            >
               <Datepick id='1' Req={true} value={state.reqDetails.date} />
            </Box>
         </Box>

         <Box className={classes.lastboxSize2}>
            {/* <UploadBtn
               url={props.data.Quotation_Document_URL}
               _id={props.data._id}
               action={props.action}
               setDocUrl={childState}
            /> */}

            <FormControl
               variant='outlined'
               size='small'
               required
               style={{ marginLeft: '20px', width: '100%' }}
            >
               <InputLabel
                  style={{ backgroundColor: 'white', padding: '0 5px' }}
               >
                  Status
               </InputLabel>
               <Select
                  name='status'
                  fullWidth
                  variant='outlined'
                  value={state.reqDetails.status}
                  required
                  onChange={event => setValue(event)}
               >
                  <MenuItem value='Status' disabled>
                     Status
                  </MenuItem>
                  <MenuItem value='Requesting'>Requesting</MenuItem>
                  <MenuItem value='Processing'>Processing</MenuItem>
                  <MenuItem value='ForwardedToAdmin'>ForwardedToAdmin</MenuItem>
                  <MenuItem value='ForwardedToFinance'>
                     ForwardedToFinance
                  </MenuItem>
                  <MenuItem value='Rejected'>Rejected</MenuItem>
               </Select>
            </FormControl>
         </Box>
      </Box>
   );
   return (
      <Box width='100%'>
         <Box>
            <Box textAlign='center'>
               <h1>{props.heading}</h1>
            </Box>
            <Box className={classes.lbox}>{Form}</Box>
            <Box display={props.btnDisplay} justifyContent='flex-end' p={0}>
               <Box pr={2} pb={4}>
                  <Button
                     style={{ fontWeight: 'bold' }}
                     size='large'
                     color='primary'
                     variant='contained'
                     onClick={onCancel}
                  >
                     Cancel
                  </Button>
               </Box>
               <Box display='flex' justifyContent='flex-end' pr={9.5} pb={4}>
                  <Button
                     style={{ fontWeight: 'bold' }}
                     size='large'
                     color='primary'
                     variant='contained'
                     onClick={() => {
                        onSubmit();
                     }}
                  >
                     Submit
                  </Button>
               </Box>
            </Box>
         </Box>
      </Box>
   );
};

export default PurchaseForm;
