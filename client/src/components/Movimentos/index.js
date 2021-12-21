import React, { Component, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import logo_alta from '../../assets/logo_alta.png'
import Footer from '../../components/Footer'
import { Link as LinkRouter, useHistory, Redirect } from 'react-router-dom';
import axios from 'axios';
import { login } from "../../containers/ServiceAuth";
import Dashboard from '../../pages/Dashboard/Dashboard';

export default function Cadastro_Movimentos() {
    return (
        <div>
            <Dashboard></Dashboard>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Grid container justify="center">
                    </Grid>
                    <form>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="movimento"
                            label="Nome do movimento"
                            name="movimento"
                            autoComplete="movimento"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="link"
                            label="Link do youtube"
                            type="link"
                            id="link"
                            autoComplete="link"
                        />
                    </form>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox />} label="Aquecimento" color="secondary"/>
                        <FormControlLabel control={<Checkbox />} label="Reabilitação" color="secondary"/>
                        <FormControlLabel control={<Checkbox />} label="Core" color="secondary"/>
                        <FormControlLabel control={<Checkbox />} label="Força" color="secondary"/>
                        <FormControlLabel control={<Checkbox />} label="Metabólico" color="secondary"/>
                        //O "onClick" do FormControlLabel é onChange, com a mesma estrutura
                    </FormGroup>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
        </div>
    );
}
