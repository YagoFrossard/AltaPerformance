import React from 'react';
import { Switch, Route, BrowserRouter, Link } from 'react-router-dom';

import Signup from '../Signup/index';
import LoginPage from '../../pages/Login/Login';
import Dashboard from '../../pages/Dashboard/Dashboard'
import PrivateRoute from '../PrivateRoute/index'
import Movimentos from '../../pages/Moves/Movimentos';

//<Route exact path='/' component={Index}></Route>
//<Route exact path='/signup' component={Yago}></Route>

const Main = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/login' component={LoginPage}></Route>
                <Route exact={true} path='/' component={LoginPage}></Route>
                <PrivateRoute exact path='/dashboard' component={Dashboard}/>
                <PrivateRoute exact path='/dashboard/signup' component={Signup}/>
                <PrivateRoute exact path='/dashboard/cadmov' component={Movimentos}/>
            </Switch>
        </BrowserRouter>
    );
    //<PrivateRoute exact path='/dashboard' component={Dashboard}></Route>
    //<Route exact path='/dashboard' component={Dashboard}></Route>
}

export default Main;