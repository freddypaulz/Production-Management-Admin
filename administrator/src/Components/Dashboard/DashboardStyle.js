import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
   boxOutProp: {
      color: '#000',
      backgroundColor: '#eee',
      padding: 0,
      minWidth: '20vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'left',
      maxHeight: '100vh',
      overflow: 'auto'
   },

   boxInProp: {
      fontSize: '1.2vw',
      color: 'black',
      fontWeight: 'bold',
      textDecoration: 'none',
      '&:hover': {
         cursor: 'pointer',
         borderLeft: '1.0vw solid #3f51b5',
         color: '#3f51b5',
         transition: 'all .2s',
         boxShadow: '0px 2px 0px #3f51b5'
      },
      '&:active': {
         backgroundColor: '#3f51b5',
         color: 'white'
      }
   },

   position: {
      display: 'flex',
      position: 'sticky',
      fontSize: '2.0vw',
      backgroundColor: '#3f51b5',
      color: 'white',
      padding: 20,
      top: 0,
      flexDirection: 'row'
   }
}));
