import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import { makeStyles } from '@material-ui/core/styles';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import ViewQuiltOutlinedIcon from '@material-ui/icons/ViewQuiltOutlined';
import SettingsIcon from '@material-ui/icons/Settings';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import PlaylistAddCheckOutlinedIcon from '@material-ui/icons/PlaylistAddCheckOutlined';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Redirect, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: "100%",
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        color: "#white"
    },
    navbar: {
        color: "red"
    },
    avataricon: {
        marginRight: theme.spacing(3)
    },
}));

export default function Dashboard() {
    const [hora, setHora] = useState(Date());
    const [loggedUser, setUser] = useState(null);
    const classes = useStyles();
    let history = useHistory();

    useEffect(() => {
        axios.get('http://localhost:5000/', {
            headers: {
                'Content-Type': 'application/json'
            }, withCredentials: true
        })
            .then(res => setUser(res.data.name))
            .catch(err => console.log(err));
    }, [])

    useEffect(() => {
        document.body.style.background = 'white'
    }, [])

    useEffect(() => {
        let interval = null;
        interval = setInterval(() => {
            setHora(Date())
        }, 1000);
        return () => clearInterval(interval);
    }, [setHora]);

    const logout = (e) => {
        e.preventDefault();
        axios.get('http://localhost:5000/logout', {
            headers: {
                'Content-Type': 'application/json'
            }, withCredentials: true
        })
            .then(() => {
                history.push('/login');
            })
            .catch(err => console.log(err + "Erro ao deslogar"));
    }


    return (
        <div>
            <AppBar id="sdb" position={"static"} className={classes.root}>
                <Toolbar>
                    <IconButton className={classes.menuButton} edge="start" color="inherit" aria-label="menu">
                        <ViewModuleIcon fontSize={'large'} />
                    </IconButton>
                    <Typography align={"flexDirection"} variant={"h6"} className={classes.title}>
                        ALTA
                        <>PERFORMANCE</>
                    </Typography>
                    <AccountCircleIcon className={classes.avataricon} style={{ fontSize: 50 }} ></AccountCircleIcon>
                    <Typography align={"right"}>
                        {"Bem-Vindo, " + loggedUser + " "}
                        {new Date(hora).toLocaleDateString() + " " + new Date(hora).toLocaleTimeString()}
                        <Button type="submit"
                            fullWidth
                            size="small"
                            onClick={logout}
                            variant="contained" >Logout
                        </Button>
                    </Typography>
                </Toolbar>
            </AppBar>
            <br />
            <SideNav
                id="sdb"
                onSelect={(selected) => {
                    // Add your code here
                }}
            >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="home">
                    <NavItem eventKey="dashboard">
                        <NavIcon>
                            <i style={{ fontSize: '1.75em' }} />
                            <ViewQuiltOutlinedIcon style={{ fontSize: 40 }} ></ViewQuiltOutlinedIcon>
                        </NavIcon>
                        <NavText>
                            Dashboard
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="professores">
                        <NavIcon>
                            <i style={{ fontSize: '1.75em' }} />
                            <SupervisedUserCircleIcon style={{ fontSize: 40 }}></SupervisedUserCircleIcon>
                        </NavIcon>
                        <NavText>
                            Professores
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="alunos">
                        <NavIcon>
                            <i style={{ fontSize: '1.75em' }} />
                            <PeopleAltIcon style={{ fontSize: 40 }} ></PeopleAltIcon>
                        </NavIcon>
                        <NavText>
                            Alunos
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="movimentos">
                        <NavIcon>
                            <i style={{ fontSize: '1.75em' }} />
                            <PlaylistAddCheckOutlinedIcon color="primary" style={{ fontSize: 40 }} ></PlaylistAddCheckOutlinedIcon>
                        </NavIcon>
                        <NavText>
                            Movimentos
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="gerador">
                        <NavIcon>
                            <i style={{ fontSize: '1.75em' }} />
                            <SettingsIcon style={{ fontSize: 40 }}></SettingsIcon>
                        </NavIcon>
                        <NavText>
                            Gerador
                        </NavText>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
        </div>
    );
}