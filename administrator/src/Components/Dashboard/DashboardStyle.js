import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
   boxOutProp: {
      color: '#000',
      backgroundColor: '#f5f6fc',
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'left',
      maxHeight: '100vh',
      minHeight: '100vh',
      overflow: 'auto',
      transition: 'all .2s',
      '&:hover': {
         cursor: 'pointer',
         maxWidth: '15vw',
         transition: 'all .2s'
      }
   },

   boxInProp: {
      fontSize: '1.2vw',
      color: 'black',
      fontWeight: 'bold',
      textDecoration: 'none',
      '&:hover': {
         cursor: 'pointer',
         color: '#7d8cfa',
         transition: 'all .2s',
         backgroundColor: '#e4e5f0'
      }
   },

   position: {
      display: 'flex',
      position: 'sticky',
      backgroundColor: '#3f51b5',
      color: 'white',
      padding: 10,
      top: 0,
      fontWeight: 'bold',
      flexDirection: 'row',
      width: '92.5%'
   }
}));
