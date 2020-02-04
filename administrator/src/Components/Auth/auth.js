import React from 'react';
import { Redirect } from 'react-router-dom';
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
   }
}

export default new auth();
