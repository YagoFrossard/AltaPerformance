import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function Dashboard() {
    const [hora, setHora] = useState(Date());
    const [loggedUser, setUser] = useState(null);
    const classes = useStyles();

    const getUser = (e) => {
        e.preventDefault();

        axios.get('http://localhost:5000/', {
            headers: {
                'Content-Type': 'application/json'
            }, withCredentials: true
        })
            .then(res => {console.log(res.data)})
            .catch(err => console.log(err));
    }

    useEffect(() => {
        axios.get('http://localhost:5000/', {
            headers: {
                'Content-Type': 'application/json'
            }, withCredentials: true
        })
            .then(res => setUser(res.data))
            .catch(err => console.log(err));
    }, [])

    useEffect(() => {
        let interval = null;
        interval = setInterval(() => {
            setHora(Date())
        }, 1000);
        return () => clearInterval(interval);
    }, [setHora]);


    return (
        <div>
            <AppBar position={"static"} className={classes.root}>
                <Toolbar>
                    <IconButton className={classes.menuButton} edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant={"h6"} className={classes.title}>
                        Barra de menu
                    </Typography>
                    <Typography align={"right"}>
                        {"Bem-Vindo, " + loggedUser + " "}
                        {new Date(hora).toLocaleDateString() + " " + new Date(hora).toLocaleTimeString()}
                        <Button type="submit"
                                fullWidth
                                size="small"
                                variant="contained" >Logout</Button>
                    </Typography>
                </Toolbar>
            </AppBar>
            asda
            <br />
            teste
            <button onClick={getUser}>Console.log usuario</button>
        </div>
    );
}