import React from 'react';
import {
   MuiPickersUtilsProvider,
   KeyboardDatePicker
} from '@material-ui/pickers';

import MomentUtils from '@date-io/moment';

export const Datepick = props => {
   const [selectedDate, setSelectedDate] = React.useState(
      new Date('02-14-1997')
   );
   const handleDateChange = date => {
      props.setDate(date);
   };
   const req = props.Req;

   return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
         {req === 'true' ? (
            <KeyboardDatePicker
               id={`date-picker-dialog${props.id}`}
               label={props.Name}
               format='DD/MM/YYYY'
               onChange={handleDateChange}
               value={props.value}
               KeyboardButtonProps={{
                  'aria-label': 'change date'
               }}
               fullWidth
               inputVariant='outlined'
               style={{
                  marginRight: props.marginRight,
                  marginTop: '0px',
                  marginBottom: props.marginBottom
               }}
               required
            />
         ) : (
            <KeyboardDatePicker
               id={`date-picker-dialog${props.id}`}
               label={props.Name}
               format='DD/MM/YYYY'
               onChange={handleDateChange}
               value={props.value}
               KeyboardButtonProps={{
                  'aria-label': 'change date'
               }}
               fullWidth
               inputVariant='outlined'
               style={{
                  marginRight: props.marginRight,
                  marginTop: '0px',
                  marginBottom: props.marginBottom
               }}
            />
         )}
      </MuiPickersUtilsProvider>
   );
};
