import React from 'react';
import './App.css';
import Management from './Containers/Management/Management';
import Login from './Containers/Login/Login';
import { BrowserRouter, Route } from 'react-router-dom';
import ProtectedRoute from './Components/Auth/ProtectedRoute';

function App() {
   return (
      <BrowserRouter>
         <Route path='/' exact component={Login} />
         <ProtectedRoute path='/management' component={Management} />
      </BrowserRouter>
   );
}

export default App;
