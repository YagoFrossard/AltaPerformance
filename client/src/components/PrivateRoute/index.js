import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import axios from "axios";

class Index extends Component {
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
        /*const isAuthenticated = axios.get('http://localhost:5000/isAuthenticated', {
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
            .catch(err => console.log(err));*/

        return isAuthenticated() ? (
            <Node />
        ) : (
            <Redirect to={{ pathname: '/login' }} />
        );
    }
}

export default Index;