import React, {useEffect, useState} from 'react';

export default function Dashboard() {
    const [hora, setHora] = useState(Date().toLocaleString());

    useEffect(() => {
        let interval = null;
        interval = setInterval(() => {
            setHora(Date().toLocaleString())
        },1000);
        return () => clearInterval(interval);
        /*setAttr(() => {
            return <div>Hora : ${attr}</div>
        })*/
    }, [setHora]);

    return (
        <div>
            asda
            {hora}
            <br/>
            teste
        </div>
    );
}