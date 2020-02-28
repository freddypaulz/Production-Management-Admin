import React, { Component } from 'react';
import {
   Box,
   TextField,
   Button,
   Select,
   FormControl,
   InputLabel,
   MenuItem
} from '@material-ui/core';
import axios from 'axios';
import Styles from './styles/FormStyles';
import { Datepick } from '../../../Components/Date/Datepick';

const styles = Styles;
const style = {
   marginRight: '6px',
   marginLeft: '6px'
};
export default class AddPurchase extends Component {
   constructor(props) {
      super();
      this.state = {
         _id: '',
         Raw_Material_Id: '',
         Raw_Material_Code: '',
         Quantity: '',
         Measuring_Unit: '',
         Priority: '',
         Due_Date: null,
         Status: '',
         Comments: '',
         Total_Price: '',
         Vendor: '',
         errors: [],
         success: false,
         measuring_units: [],
         materials: [],
         vendors: [],
         code: '',
         to: ''
      };
      this.onAddHandler = () => {
         //  axios
         //     .post('/logs/comment', {
         //        logs: {
         //           reqId: props.Purchase._id,
         //           from: 'Admin',
         //           to: this.state.to,
         //           comments: this.state.Comments
         //        }
         //     })
         //     .then(comments => {
         //        console.log('Comments: ', comments);
         console.log('User: ', sessionStorage.getItem('User ID'));
         console.log('Role: ', sessionStorage.getItem('Role ID'));
         axios
            .post('/request-details/add', {
               Raw_Material_Id: this.state.Raw_Material_Id,
               Raw_Material_Code: this.state.Raw_Material_Code,
               Quantity: this.state.Quantity,
               Measuring_Unit: this.state.Measuring_Unit,
               Priority: this.state.Priority,
               Due_Date: this.state.Due_Date,
               Status: this.state.Status,
               //  Comments: comments.data._id,
               Comments: this.state.Comments,
               Vendor: this.state.Vendor,
               Total_Price: this.state.Total_Price,
               Created_By: {
                  Employee_Id: sessionStorage.getItem('User ID'),
                  Role_Id: sessionStorage.getItem('Role ID')
               },
               logs: {
                  from: 'Admin',
                  to: this.state.to,
                  comments: this.state.Comments
               }
            })
            .then(res => {
               console.log(res.data);
            });
         // })
         // .catch(err => console.log(err));
         this.props.cancel();
      };

      this.loadStatus = () => {
         let status = ['ForwardedToPurchase', 'ForwardedToFinance', 'Rejected'];
         return status.map((msg, index) => (
            <MenuItem key={index} value={msg}>
               {msg}
            </MenuItem>
         ));
      };
   }

   componentDidMount() {
      axios.get('/raw-materials/raw-materials').then(res => {
         console.log(res);
         this.setState({
            materials: [...res.data.RawMaterials]
         });
      });
      axios.get('/vendors/vendors').then(res => {
         console.log(res);
         this.setState({
            vendors: [...res.data.Vendors]
         });
      });
      axios.get('/measuring-units/measuring-units').then(res => {
         console.log(res);
         this.setState({
            measuring_units: [...res.data.MeasuringUnits]
         });
      });
   }

   render() {
      return (
         <Box style={styles.box}>
            <Box fontSize='30px' mb={3}>
               Request Details
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
                  Successful
               </Box>
            ) : null}
            <Box style={styles.root}>
               <Box display='flex' justifyContent='center'>
                  <Box style={styles.lbox}>
                     <Box style={styles.form}>
                        <Box style={styles.boxSize2}>
                           <Box width='50%' style={style}>
                              <FormControl
                                 required
                                 variant='outlined'
                                 fullWidth
                                 size='small'
                              >
                                 <InputLabel
                                    style={{
                                       backgroundColor: 'white',
                                       paddingLeft: '2px',
                                       paddingRight: '2px'
                                    }}
                                 >
                                    Material Name
                                 </InputLabel>
                                 <Select
                                    variant='outlined'
                                    required
                                    name='Raw_Material_Id'
                                    value={this.state.Raw_Material_Id}
                                    onChange={event => {
                                       let materialCode;
                                       this.state.materials.map(material => {
                                          if (
                                             material._id === event.target.value
                                          ) {
                                             materialCode =
                                                material.raw_material_code;
                                             console.log(
                                                'code: ',
                                                materialCode
                                             );
                                          }
                                       });
                                       this.setState({
                                          Raw_Material_Id: event.target.value,
                                          Raw_Material_Code: materialCode
                                       });
                                    }}
                                 >
                                    {this.state.materials.map(
                                       (material, index) => {
                                          return (
                                             <MenuItem
                                                //selected
                                                key={index}
                                                value={material._id}
                                             >
                                                {material.raw_material_name}
                                             </MenuItem>
                                          );
                                       }
                                    )}
                                 </Select>
                              </FormControl>
                           </Box>
                           <Box width='50%' style={style}>
                              <TextField
                                 size='small'
                                 fullWidth
                                 variant='outlined'
                                 label='Material_Code'
                                 required
                                 name='Material_Code'
                                 value={this.state.Raw_Material_Code}
                                 onChange={event => {
                                    this.setState({
                                       Material_Code: event.target.value
                                    });
                                    console.log(event.target.value);
                                 }}
                              ></TextField>
                           </Box>
                        </Box>
                        <Box style={styles.boxSize2}>
                           <Box width='50%' style={style}>
                              <TextField
                                 size='small'
                                 fullWidth
                                 variant='outlined'
                                 label='Quantity'
                                 required
                                 name='Quantity'
                                 value={this.state.Quantity}
                                 onChange={event => {
                                    this.setState({
                                       Quantity: event.target.value
                                    });
                                 }}
                              ></TextField>
                           </Box>
                           <Box width='50%' style={style}>
                              <FormControl
                                 required
                                 variant='outlined'
                                 fullWidth
                                 size='small'
                              >
                                 <InputLabel
                                    style={{
                                       backgroundColor: 'white',
                                       paddingLeft: '2px',
                                       paddingRight: '2px'
                                    }}
                                 >
                                    Measuring Unit
                                 </InputLabel>
                                 <Select
                                    name='Measuring_Unit'
                                    variant='outlined'
                                    required
                                    value={this.state.Measuring_Unit}
                                    onChange={event => {
                                       this.setState({
                                          Measuring_Unit: event.target.value
                                       });
                                       console.log(event.target.value);
                                    }}
                                 >
                                    {this.state.measuring_units.map(
                                       (measuring_unit, index) => {
                                          return (
                                             <MenuItem
                                                selected
                                                key={index}
                                                value={measuring_unit._id}
                                             >
                                                {
                                                   measuring_unit.measuring_unit_name
                                                }
                                             </MenuItem>
                                          );
                                       }
                                    )}
                                 </Select>
                              </FormControl>
                           </Box>
                        </Box>
                        <Box style={styles.boxSize2}>
                           <Box width='50%' style={style}>
                              <FormControl
                                 required
                                 variant='outlined'
                                 fullWidth
                                 size='small'
                              >
                                 <InputLabel
                                    style={{
                                       backgroundColor: 'white',
                                       paddingLeft: '2px',
                                       paddingRight: '2px'
                                    }}
                                 >
                                    Vendor Name
                                 </InputLabel>
                                 <Select
                                    variant='outlined'
                                    required
                                    name='Vendor'
                                    value={this.state.Vendor}
                                    onChange={event => {
                                       this.setState({
                                          Vendor: event.target.value
                                       });
                                    }}
                                 >
                                    {this.state.vendors.map((vendor, index) => {
                                       return (
                                          <MenuItem
                                             //selected
                                             key={index}
                                             value={vendor._id}
                                          >
                                             {vendor.vendor_name}
                                          </MenuItem>
                                       );
                                    })}
                                 </Select>
                              </FormControl>
                           </Box>
                           <Box width='50%' style={style}>
                              <TextField
                                 size='small'
                                 fullWidth
                                 variant='outlined'
                                 label='Total_Price'
                                 required
                                 name='Total_Price'
                                 value={this.state.Total_Price}
                                 onChange={event => {
                                    this.setState({
                                       Total_Price: event.target.value
                                    });
                                 }}
                              ></TextField>
                           </Box>
                        </Box>
                        <Box style={styles.boxSize2}>
                           <Box width='50%' style={style}>
                              <FormControl
                                 required
                                 variant='outlined'
                                 fullWidth
                                 size='small'
                              >
                                 <InputLabel
                                    style={{
                                       backgroundColor: 'white',
                                       paddingLeft: '2px',
                                       paddingRight: '2px'
                                    }}
                                 >
                                    Priority
                                 </InputLabel>
                                 <Select
                                    variant='outlined'
                                    required
                                    name='Priority'
                                    value={this.state.Priority}
                                    onChange={event => {
                                       this.setState({
                                          Priority: event.target.value
                                       });
                                    }}
                                 >
                                    <MenuItem value='Priority' disabled>
                                       Priority
                                    </MenuItem>
                                    <MenuItem value='Low'>Low</MenuItem>
                                    <MenuItem value='Medium'>Medium</MenuItem>
                                    <MenuItem value='High'>High</MenuItem>
                                 </Select>
                              </FormControl>
                           </Box>
                           <Box width='50%' style={style}>
                              <Datepick
                                 id='4'
                                 variant='outlined'
                                 Name='Due_Date'
                                 value={this.state.Due_Date}
                                 setDate={date => {
                                    this.setState({
                                       Due_Date: date
                                    });
                                    console.log(date);
                                 }}
                              />
                           </Box>
                        </Box>
                        <Box style={styles.boxSize2}>
                           <Box width='100%' style={style}>
                              <FormControl
                                 required
                                 variant='outlined'
                                 fullWidth
                                 size='small'
                              >
                                 <InputLabel
                                    style={{
                                       backgroundColor: 'white',
                                       paddingLeft: '2px',
                                       paddingRight: '2px'
                                    }}
                                 >
                                    Status
                                 </InputLabel>
                                 <Select
                                    variant='outlined'
                                    required
                                    name='Status'
                                    value={this.state.Status}
                                    onChange={event => {
                                       this.setState({
                                          Status: event.target.value
                                       });
                                       if (
                                          event.target.value ===
                                          'ForwardedToFinance'
                                       ) {
                                          this.setState(pre => {
                                             pre.to = 'Finance';
                                          });
                                       } else if (
                                          event.target.value ===
                                          'ForwardedToPurchase'
                                       ) {
                                          this.setState(pre => {
                                             pre.to = 'Purchase';
                                          });
                                       } else {
                                          this.setState(pre => {
                                             pre.to = 'Rejected';
                                          });
                                       }

                                       console.log(this.state.to);
                                    }}
                                 >
                                    {this.loadStatus()}
                                 </Select>
                              </FormControl>
                           </Box>
                           <Box width='100%' style={style}>
                              <TextField
                                 size='small'
                                 multiline
                                 rowsMax='3'
                                 variant='outlined'
                                 fullWidth
                                 label='Comments'
                                 value={this.state.Comments}
                                 onChange={event => {
                                    this.setState({
                                       Comments: event.target.value
                                    });
                                    console.log(event.target.value);
                                 }}
                              ></TextField>
                           </Box>
                        </Box>
                     </Box>
                  </Box>
               </Box>
            </Box>
            <Box
               pt={2}
               pb={2}
               m={0}
               display='flex'
               justifyContent='flex-end'
               width='87%'
            >
               <Box display='flex'>
                  <Button
                     variant='contained'
                     color='primary'
                     size='large'
                     fontWeight='Bold'
                     onClick={() => {
                        this.props.cancel();
                     }}
                     style={{ fontWeight: 'bold' }}
                  >
                     Cancel
                  </Button>
               </Box>
               <Box marginLeft='10px' display={this.props.disabled.btnDisplay}>
                  <Button
                     variant='contained'
                     color='primary'
                     size='large'
                     fontWeight='bold'
                     onClick={this.onAddHandler}
                     style={{ fontWeight: 'bold' }}
                  >
                     Submit
                  </Button>
               </Box>
            </Box>
         </Box>
      );
   }
}
