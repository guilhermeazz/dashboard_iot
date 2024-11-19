import React, { useContext } from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { DataContext } from '../../services/mqttdata';

const Histograma = ({ recent }) => {
    const { historico } = useContext(DataContext);

    const intervalos = Array.from({ length: 10 }, (_, i) => i * 10);
    const data = intervalos.map(intervalo => ({
        intervalo: `${intervalo}-${intervalo + 10}`,
        count: recent
            ? historico.slice(-20).filter(dado => dado.numero >= intervalo && dado.numero < intervalo + 10).length
            : historico.filter(dado => dado.numero >= intervalo && dado.numero < intervalo + 10).length
    }));

    return (
        <RechartsBarChart width={600} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="intervalo" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
        </RechartsBarChart>
    );
};

export default Histograma;
