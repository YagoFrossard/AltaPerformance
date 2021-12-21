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
import Icon from '@material-ui/core/Icon';
import { Redirect, useHistory } from 'react-router-dom';
import {logout as logoutAuth} from "../../services/auth.service";
import authHeader from "../../services/auth.header";
import link from '../../envClient';

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
    }
}));

export default function Dashboard() {
    const [hora, setHora] = useState(Date());
    const [loggedUser, setUser] = useState(null)
    const [userType, setUserType] = useState(null)
    const [navBarAtiva, setNavbar] = useState(false)
    const classes = useStyles();
    let history = useHistory();

    useEffect(() => {
        axios.get(`${link}/user/me`, {
            headers: authHeader(),
            withCredentials: true
        })
            .then(res => {
                setUser(res.data.name);
                setUserType(res.data.user_type);
                //console.log(res.data);
            })
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
        axios.get(`${link}/logout`, {
            headers: {
                'Content-Type': 'application/json'
            }, withCredentials: true
        })
            .then(() => {
                logoutAuth();
                history.push('/login');
            })
            .catch(err => console.log(err + "Erro ao deslogar"));
    }

    const paginaPerfil = (e) => {
        e.preventDefault();
        axios.get(`${link}/secure/profile`, {
            headers: authHeader(),
            withCredentials: true
        })
            .then((res) => {
                setUser(res.data.email);
                console.log("Acesso a página segura concedido!");
            })
            .catch(err => console.log(err + "Não foi possivel acessar página segura !! XX"));
    }

    const navBarAbrir = () => {
        setNavbar(!navBarAtiva);
    }

    // Use este link para os 'icons' https://fonts.google.com/icons
    const navBarItems = [
        {
            key: "dashboard",
            title: "Dashboard",
            icon: "view_quilt",
            roleNeeded: "",
            goToLink: "/dashboard"
        },
        {
            key: "professores",
            title: "Professores",
            icon: "supervised_user_circle",
            roleNeeded: "ADMINISTRADOR",
            goToLink: "/"
        },
        {
            key: "aluno",
            title: "Aluno",
            icon: "people_alt",
            roleNeeded: "ALUNO",
            goToLink: "/"
        },
        {
            key: "movimentos",
            title: "Movimentos",
            icon: "playlist_add_check",
            roleNeeded: "",
            goToLink: "/cadmov"
        },
        {
            key: "gerador",
            title: "Gerador",
            icon: "settings",
            roleNeeded: "PROFESSOR",
            goToLink: "/"
        }
    ]

    const roleLevel = (user_type) => {
        switch (user_type) {
            case 'ADMINISTRADOR':
                return 2;
                break;
            case 'PROFESSOR':
                return 1;
                break;
            case 'ALUNO':
                return 0;
                break;
            default:
                return 0;
        }
    }

    return (
        <div>
            <AppBar id="sdb" position={"static"} className={classes.root}>
                <Toolbar>
                    <IconButton className={classes.menuButton} edge="start" color="inherit" aria-label="menu">
                        <ViewModuleIcon fontSize={'large'} />
                    </IconButton>
                    <Typography align={"flexDirection"} variant={"h6"} className={classes.title} style={{marginLeft : navBarAtiva ? 170 : 0,transition: 'margin-left 0.2s ease 0s'}}>
                        ALTA
                        <span style={{fontWeight: 'bold'}}>PERFORMANCE</span>
                    </Typography>
                    <AccountCircleIcon
                        className={classes.avataricon}
                        style={{ fontSize: 50 }}
                        onToggle={paginaPerfil}
                    ></AccountCircleIcon>
                    <Typography align={"left"}>
                        {"Bem-Vindo, " + loggedUser + " "}
                        {new Date(hora).toLocaleDateString() + " " + new Date(hora).toLocaleTimeString()}
                        <Button 
                            type="submit"
                            size="medium"
                            onClick={logout}
                            variant="contained">
                            Logout
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
                onClick={navBarAbrir}
            >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="home">
                    {navBarItems.map(
                        (item, index) => {
                            if(roleLevel(userType) >= roleLevel(item.roleNeeded)) {
                                return(     
                                <NavItem eventKey={item.key} key={index} onClick={()=>{history.push(item.goToLink)}}>
                                    <NavIcon>
                                        <i style={{fontSize: '1.75em'}}/>
                                        <Icon fontSize={"large"}>{item.icon}</Icon>
                                    </NavIcon>
                                    <NavText>
                                        {item.title}
                                    </NavText>
                                </NavItem>
                                )
                            }
                        }
                    )}
                </SideNav.Nav>
            </SideNav>
            <div style={{ marginLeft : navBarAtiva ? 240 : 64, transition: 'margin-left 0.2s ease 0s'}} >Testeeeeeeeeeeeeeeeeeeeeeeeee</div>
        </div>
    );
}