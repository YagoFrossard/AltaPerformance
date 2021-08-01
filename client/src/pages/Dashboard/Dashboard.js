import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
    const [hora, setHora] = useState(Date().toLocaleString());

    const getUser = (e) => {
        e.preventDefault();

        axios.get('http://localhost:5000/', {
            headers: {
                'Content-Type': 'application/json'
            }, withCredentials: true
        })
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
    }

    useEffect(() => {
        let interval = null;
        interval = setInterval(() => {
            setHora(Date().toLocaleString())
        }, 1000);
        return () => clearInterval(interval);
        /*setAttr(() => {
            return <div>Hora : ${attr}</div>
        })*/
    }, [setHora]);

    return (
        <div>
            asda
            {hora}
            <br />
            teste
            <button onClick={getUser}></button>
        </div>
    );
}