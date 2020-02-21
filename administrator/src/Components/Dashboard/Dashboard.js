import React, { useState } from 'react';
import { Box, Divider } from '@material-ui/core';
import { useStyles } from './DashboardStyle.js';
import { NavLink } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';

export default function Dashboard(props) {
   const classes = useStyles();
   const styles = {
      navStyle: {
         display: 'flex',
         textDecoration: 'none',
         padding: '15px',
         color: 'black'
      },
      navStyleActive: {
         color: '#3f51b5'
      }
   };
   const [state, setState] = useState({
      dashboard: '20vw'
   });
   return (
      <Box display='flex'>
         <Box
            // minWidth='20vw'
            maxWidth={state.dashboard}
            component='div'
            className={classes.boxOutProp}
         >
            <Box className={classes.position}>
               <Box fontSize='30px' display='flex' justifyContent='flex-start'>
                  DASHBOARD
               </Box>
               <Box
                  marginLeft='75px'
                  bgcolor='red'
                  display='flex'
                  padding='5px'
                  paddingRight='0px'
                  textAlign='flex-end'
               >
                  <ArrowBackIosIcon
                     style={{
                        fontSize: '30px'
                     }}
                     onClick={() => {
                        setState({
                           dashboard: '.1px'
                        });
                     }}
                  />
               </Box>
            </Box>
            <Divider />
            {props.items.map((item, index) => {
               return (
                  <div key={index}>
                     <Box className={classes.boxInProp}>
                        <NavLink
                           activeStyle={styles.navStyleActive}
                           style={styles.navStyle}
                           to={`/${props.componentName}/${item.Path}`}
                        >
                           {item.Name}
                        </NavLink>
                     </Box>
                     <Divider />
                  </div>
               );
            })}
         </Box>
         {state.dashboard === '1px' ? (
            <Box
               style={{
                  color: 'black',
                  display: 'flex',
                  padding: '20px'
               }}
            >
               <MenuRoundedIcon
                  style={{ fontSize: '40px' }}
                  onClick={() => {
                     setState({
                        dashboard: '20vw'
                     });
                  }}
               />
            </Box>
         ) : null}
      </Box>
   );
}
