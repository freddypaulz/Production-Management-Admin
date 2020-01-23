import React from 'react';
import './App.css';
import Dashboard from './Components/Dashboard/Dashboard';
import Management from './Components/Management/Management';
import Login from './Components/Login/Login';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
   return (
      <BrowserRouter>
         <Route path='/' exact component={Login} />
         <Route path='/management' component={Management} />
      </BrowserRouter>
   );
}

export default App;
