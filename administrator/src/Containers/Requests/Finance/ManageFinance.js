import React, { Component } from 'react';
import MaterialTable from 'material-table';
import {
   Box,
   Dialog,
   Snackbar,
   Button,
   DialogContent
} from '@material-ui/core';
import Axios from 'axios';
import PurchaseForm from './PurchaseForm';
import Alert from '@material-ui/lab/Alert';

export default class ManageFinance extends Component {
   constructor(props) {
      super();
      this.state = {
         columns: [
            { title: 'Material Name', field: 'Raw_Material_Name' },
            { title: 'Quantity', field: 'Quantity' },
            { title: 'Unit', field: 'Measuring_Unit' },
            { title: 'Vendor', field: 'Vendor_name' },
            { title: 'Total Price', field: 'Total_Price' },
            { title: 'Quotation Document', field: 'Quotation_Document_URL' },
            { title: 'Status', field: 'Status' }
         ],
         data: [],
         open: false,
         openHistory: false,
         heading: '',
         visible: 'none',
         childbtnDisplay: 'none',
         fieldData: [],
         action: '',
         addIcon: false,
         alert: false
      };
      this.closeAlert = this.closeAlert.bind(this);
      this.handler = this.handler.bind(this);
   }
   handler(row, ch) {
      this.setState({
         open: false
      });
      this.callDetails();
   }

   callDetails() {
      let req = [];
      Axios.get('/request-details')
         .then(res => res.data)
         .then(RequestDetails => {
            RequestDetails.map(RequestDetail => {
               if (this.props.load) {
                  if (RequestDetail.Status !== 'Completed') {
                     console.log('hello');
                     Axios.post('/vendors/vendor', {
                        _id: RequestDetail.Vendor
                     })
                        .then(res => {
                           RequestDetail.Vendor_name =
                              res.data.Vendor[0].vendor_name;
                           req.push(RequestDetail);
                           console.log(req);
                           this.setState({
                              data: [...req]
                           });
                        })
                        .catch(err => {
                           RequestDetail.Vendor = 'Problem loading vendor';
                           req.push(RequestDetail);
                           console.log(req);
                           this.setState({
                              data: [...req]
                           });
                        });
                  }
               } else {
                  if (RequestDetail.Status === 'ForwardedToAdmin') {
                     console.log('hello');
                     Axios.post('/vendors/vendor', {
                        _id: RequestDetail.Vendor
                     })
                        .then(res => {
                           RequestDetail.Vendor_name =
                              res.data.Vendor[0].vendor_name;
                           req.push(RequestDetail);
                           console.log(req);
                           this.setState({
                              data: [...req]
                           });
                        })
                        .catch(err => {
                           RequestDetail.Vendor = 'Problem loading vendor';
                           req.push(RequestDetail);
                           console.log(req);
                           this.setState({
                              data: [...req]
                           });
                        });
                  }
                  this.setState({
                     data: [...req]
                  });
               }
            });
         });
   }

   close() {
      this.setState({ open: false });
   }
   closeAlert() {
      this.setState({ alert: false });
   }

   componentDidMount() {
      this.callDetails();
   }

   render() {
      return (
         <Box
            width='100%'
            display='flex'
            alignItems='center'
            flexDirection='column'
         >
            {!this.props.load ? (
               <Box fontSize='30px' mb={3}>
                  Manage Purchase Requests
               </Box>
            ) : (
               <Box fontSize='30px' mb={3}>
                  All Purchase Requests
               </Box>
            )}
            {!this.props.load ? (
               <Box width='90%' display='flex' flexDirection='row'>
                  <Button
                     variant='contained'
                     color='primary'
                     style={{
                        marginBottom: '20px',
                        display: 'flex',
                        marginRight: '10px'
                     }}
                     size='large'
                     onClick={() => {
                        this.setState({
                           openHistory: true
                        });
                     }}
                  >
                     All Requests
                  </Button>
               </Box>
            ) : null}
            <MaterialTable
               title=''
               style={{ width: '90%', maxHeight: '500px', overflow: 'auto' }}
               columns={this.state.columns}
               data={this.state.data}
               actions={[
                  {
                     icon: 'edit',
                     tooltip: 'Edit',
                     onClick: (event, rowData) => {
                        if (rowData.Status === 'ForwardedToAdmin') {
                           console.log(rowData.Vendor);
                           this.setState({
                              open: true,
                              heading: 'Edit Request Details',
                              childbtnDisplay: 'flex',
                              action: 'Edit',
                              fieldData: rowData
                           });
                        } else {
                           this.setState({ alert: true });
                        }
                     }
                  }
                  // oldData => ({
                  //    icon: 'cancel',
                  //    tooltip: 'Reject',
                  //    onClick: (event, oldData) => {
                  //       if (oldData.Status === 'Requesting') {
                  //          this.setState(prevState => {
                  //             const data = [...prevState.data];
                  //             Axios.post('/request_details', {
                  //                deleteID: data[data.indexOf(oldData)]._id
                  //             }).then(this.componentDidMount());
                  //             return { ...prevState, data };
                  //          });
                  //       } else {
                  //          this.setState({ alert: true });
                  //       }
                  //    }
                  // })
               ]}
               options={{
                  draggable: false,
                  sorting: true,
                  headerStyle: {
                     backgroundColor: '#3f51b5',
                     color: '#FFF'
                  }
               }}
            />
            <Dialog maxWidth='lg' open={this.state.open} fullWidth>
               <Box>
                  <PurchaseForm
                     heading={this.state.heading}
                     handler={this.handler}
                     btnDisplay={this.state.childbtnDisplay}
                     data={this.state.fieldData}
                     action={this.state.action}
                  />
               </Box>
            </Dialog>
            <Dialog maxWidth='lg' open={this.state.openHistory} fullWidth>
               <DialogContent style={{ padding: '20px' }}>
                  <Box>
                     <ManageFinance load={true} />
                     <Box
                        width='95%'
                        display='flex'
                        justifyContent='flex-end'
                        marginTop='20px'
                     >
                        <Button
                           variant='contained'
                           color='primary'
                           size='large'
                           onClick={() => {
                              this.setState({
                                 openHistory: false
                              });
                           }}
                        >
                           Close
                        </Button>
                     </Box>
                  </Box>
               </DialogContent>
            </Dialog>
            <Snackbar
               open={this.state.alert}
               autoHideDuration={3000}
               anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
               onClose={this.closeAlert}
               style={{ paddingRight: '25%' }}
            >
               <Alert
                  severity='error'
                  variant='filled'
                  onClose={this.closeAlert}
               >
                  You cannot modify this record
               </Alert>
            </Snackbar>
         </Box>
      );
   }
}
