import React, {Component} from 'react';
import {Redirect, Route} from "react-router-dom";
import axios from "axios";
import {isAuthenticated} from "../../containers/ServiceAuth";

/*class Index extends Component {
    render() {
        const Node = this.props.component;
        function isAuthenticated(){
            axios.get('http://localhost:5000/isAuthenticated', {
                headers: {
                    'Content-Type': 'application/json'
                }, withCredentials: true
            })
                .then(res => {
                    if(res.data.isAuth) {
                        return true
                    }
                    else {
                        return false
                    }
                })
                .catch(err => console.log(err));
        }
        // const isAuthenticated = axios.get('http://localhost:5000/isAuthenticated', {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }, withCredentials: true
        // })
        //     .then(res => {
        //         if(res.data.isAuth) {
        //             return true
        //         }
        //         else {
        //             return false
        //         }
        //     })
        //     .catch(err => console.log(err));

        return isAuthenticated() ? (
            <Node />
        ) : (
            <Redirect to={{ pathname: '/login' }} />
        );
    }
}*/

const Index = ({ component: Component, auth, ...rest }) => {
    React.useEffect(() => {
        // EXECUTE THE CODE ONLY ONCE WHEN COMPONENT IS MOUNTED
    }, []);

    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated() ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default Index;