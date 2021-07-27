import React from 'react';
import { Switch, Route, BrowserRouter as Router, Link } from 'react-router-dom';

import Signup from '../Signup/index';
import LoginPage from '../../pages/Login/Login';
import Index from '../Main/index';

//<Route exact path='/' component={Index}></Route>
//<Route exact path='/signup' component={Yago}></Route>


const Main = () => {
    return (
        <Router>
            <Route exact path='/signup' component={Signup}></Route>
            <Route exact path='/login' component={LoginPage}></Route>
        </Router>
    );
}

export default Main;