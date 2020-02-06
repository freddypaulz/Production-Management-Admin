import React from 'react';
class auth extends React.Component {
   constructor(props) {
      super();
   }
   login = value => {
      console.log(value);
      sessionStorage.setItem('authenticated', true);
   };

   logout = () => {
      sessionStorage.clear();
      return true;
   };

   isAuthenticated() {
      // console.log(sessionStorage.getItem('authenticated'));
      return sessionStorage.getItem('authenticated');
      //return true;
   }
}

export default new auth();
