import React from 'react';
import { Box, Divider } from '@material-ui/core';
import { useStyles } from './DashboardStyle.js';
import { NavLink } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

export default function Dashboard(props) {
   const classes = useStyles();
   const styles = {
      navStyle: {
         display: 'flex',
         textDecoration: 'none',
         padding: '20px',
         color: 'black'
      },
      navStyleActive: {
         color: '#3f51b5'
      }
   };
   console.log(props.items);
   return (
      <Box display='flex'>
         <Box component='div' className={classes.boxOutProp}>
            <Box className={classes.position}>
               <Box fontSize='30px'>DASHBOARD</Box>
               {/* <ArrowBackIosIcon /> */}
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
      </Box>
   );
}
