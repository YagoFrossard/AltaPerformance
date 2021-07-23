// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
//import '@testing-library/jest-dom';
// Componente de teste

import React from 'react';
import Button from '@material-ui/core/Button';

const SetupTests = () => {
    return (
        <div>
            <Button variant="contained" color="primary">
                Butão
            </Button>
        </div>
    );
};

export default SetupTests;