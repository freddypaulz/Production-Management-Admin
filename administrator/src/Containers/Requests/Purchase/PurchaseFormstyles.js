import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
   root: {
      display: 'flex',
      flexDirection: 'column',
      width: '75%',
      overflow: 'auto'
   },
   paper: {
      width: '100%',
      overflow: 'auto'
   },
   heading: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      fontWeight: 'bold',
      paddingTop: '15px',
      paddingBottom: '25px'
   },
   lbox: {
      display: 'flex',
      flexDirection: 'row'

   },
   form: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      justifyContent: 'space-around',
      paddingTop: '20px',
      overFlow: 'auto'
   },
   boxSize2: {
      display: 'flex',
      flexDirection: 'row',
      alignContent: 'center',
      paddingTop: '10px',
      paddingLeft: '75px',
      paddingRight: '75px',
      paddingBottom: '10px'
   },
   lastboxSize2: {
      display: 'flex',
      flexDirection: 'row',
      alignContent: 'center',
      paddingTop: '10px',
      paddingLeft: '75px',
      paddingRight: '75px',
      paddingBottom: '30px'
   },

   iconBtn: {
      display: 'flex',
      alignSelf: 'flex-end',
      paddingLeft: '10px'
   },
   submit: {
      display: 'flex',
      justifyContent: 'flex-end',
      paddingTop: '25px',
      paddingBottom: '10px',
      marginRight: '50px'
   },
   formText: {
      fontWeight: 'bold',
      fontSize: 'large'
   },
   divider: {
      height: '2px'
   }
});

export default useStyles;
