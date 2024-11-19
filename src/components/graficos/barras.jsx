import React, { useContext, useState, useEffect } from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ReferenceLine } from 'recharts';
import { DataContext } from '../../services/mqttdata';

const Barras = ({ recent, thresholdType }) => {
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
            dispositivo: dado.device_id,
            numero: dado.numero
        }))
        : filteredData.map(dado => ({
            dispositivo: dado.device_id,
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
            <RechartsBarChart width={600} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dispositivo" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="numero" fill="#8884d8">
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getColor(entry.numero)} />
                    ))}
                </Bar>
                {threshold !== null && (
                    <ReferenceLine y={threshold} label={`${thresholdType} Threshold`} stroke="green" strokeWidth={3} strokeDasharray="5 5" />
                )}
                <Legend verticalAlign="top" height={36} />
            </RechartsBarChart>
            <div className="legend-info">
                <p><span style={{ color: 'green' }}>●</span> Threshold</p>
                <p><span style={{ color: 'blue' }}>●</span> Abaixo do Threshold</p>
                <p><span style={{ color: 'purple' }}>●</span> Muito Abaixo do Threshold</p>
                <p><span style={{ color: 'orange' }}>●</span> Acima do Threshold</p>
                <p><span style={{ color: 'red' }}>●</span> Muito Acima do Threshold</p>
            </div>
        </div>
    );
};

export default Barras;
