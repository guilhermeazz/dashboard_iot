import React, { useContext, useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DataContext } from '../../services/mqttdata';
import { getCorrelation } from '../../services/correlation';

const Correlacao = ({ recent }) => {
    const { historico } = useContext(DataContext);

    const [correlation, setCorrelation] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        const dispositivo1Data = historico.filter(dado => dado.device_id === 'disp1').map(dado => ({
            timestamp: dado.timestamp,
            disp1: dado.numero
        }));
        const dispositivo2Data = historico.filter(dado => dado.device_id === 'disp2').map(dado => ({
            timestamp: dado.timestamp,
            disp2: dado.numero
        }));

        const correl = getCorrelation(
            dispositivo1Data.map(d => d.disp1),
            dispositivo2Data.map(d => d.disp2)
        );
        setCorrelation(correl);

        const combinedData = dispositivo1Data.map(d => {
            const match = dispositivo2Data.find(d2 => Math.abs(new Date(d2.timestamp) - new Date(d.timestamp)) < 5000);
            return match ? { timestamp: new Date(d.timestamp).toLocaleTimeString(), disp1: d.disp1, disp2: match.disp2 } : null;
        }).filter(d => d !== null);

        const filteredData = recent ? combinedData.slice(-20) : combinedData;
        setData(filteredData);
    }, [historico, recent]);

    return (
        <div className="p-6 bg-primary-boxes shadow-lg rounded-lg">
            <h2 className="text-2xl text-primary-amarelo font-semibold mb-4">Correlação entre Dispositivos</h2>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" name="Tempo" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="disp1" stroke="#8884d8" name="Dispositivo 1" />
                    <Line type="monotone" dataKey="disp2" stroke="#82ca9d" name="Dispositivo 2" />
                </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 text-primary-azul">
                <p>Correlação entre Dispositivo 1 e Dispositivo 2: <strong>{correlation}</strong></p>
            </div>
        </div>
    );
};

export default Correlacao;
