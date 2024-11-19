import React, { useContext, useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, Cell } from 'recharts';
import { DataContext } from '../../services/mqttdata';

const Linha = ({ recent, thresholdType }) => {
    const { historico, media, mediana, desviop, moda } = useContext(DataContext);

    const [threshold, setThreshold] = useState(null);

    useEffect(() => {
        switch (thresholdType) {
            case 'media':
                setThreshold(media);
                break;
            case 'mediana':
                setThreshold(mediana);
                break;
            case 'desviop':
                setThreshold(desviop);
                break;
            case 'moda':
                setThreshold(moda);
                break;
            default:
                setThreshold(null);
        }
    }, [thresholdType, media, mediana, desviop, moda]);

    useEffect(() => {
        console.log(`Threshold Type: ${thresholdType}`);
        console.log(`Threshold Value: ${threshold}`);
    }, [threshold]);

    const removeDuplicates = (data) => {
        const seen = new Set();
        return data.filter(item => {
            const duplicate = seen.has(item.timestamp + item.device_id);
            seen.add(item.timestamp + item.device_id);
            return !duplicate;
        });
    };

    const filteredData = removeDuplicates(historico);

    const data = recent
        ? filteredData.slice(-20).map(dado => ({
            timestamp: new Date(dado.timestamp).toLocaleTimeString(),
            numero: dado.numero
        }))
        : filteredData.map(dado => ({
            timestamp: new Date(dado.timestamp).toLocaleTimeString(),
            numero: dado.numero
        }));

    const getColor = (value) => {
        if (threshold !== null) {
            if (value >= threshold * 1.5) return 'red';
            if (value > threshold) return 'orange';
            if (value === threshold) return 'green';
            if (value < threshold * 0.5) return 'purple';
            if (value < threshold) return 'blue';
        }
        return '#8884d8';
    };

    return (
        <div>
            <LineChart width={600} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="numero" stroke="#8884d8" dot={false}>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getColor(entry.numero)} />
                    ))}
                </Line>
                {threshold !== null && (
                    <ReferenceLine y={threshold} label={`${thresholdType} Threshold`} stroke="green" strokeWidth={3} strokeDasharray="5 5" />
                )}
                <Legend verticalAlign="top" height={36} />
            </LineChart>
            <div className="legend-info">
                <p><span style={{ color: 'green' }}>●</span> Threshold (Média, Mediana, Moda)</p>
            </div>
        </div>
    );
};

export default Linha;
