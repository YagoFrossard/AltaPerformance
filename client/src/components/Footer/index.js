import React from 'react';
import './style.scss'
import InstagramIcon from '@material-ui/icons/Instagram';

const Index = () => {
    return (
        <footer className="footer">
            <div className="footer__social_icons">
                <a href="#">
                    <InstagramIcon fontSize="large"/>
                </a>
                <a href="#"></a>
            </div>
            <p className="footer__copyright">
                Seu Instagram aqui 
            </p>
        </footer>
    );
};

export default Index;