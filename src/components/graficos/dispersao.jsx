import React, { useContext, useState, useEffect } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, Brush, Cell } from 'recharts';
import { DataContext } from '../../services/mqttdata';

const Dispersao = ({ recent, thresholdType }) => {
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
            x: new Date(dado.timestamp).getTime(),
            y: dado.numero,
            dispositivo: dado.device_id
        }))
        : filteredData.map(dado => ({
            x: new Date(dado.timestamp).getTime(),
            y: dado.numero,
            dispositivo: dado.device_id
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
            <ScatterChart width={600} height={300}>
                <CartesianGrid />
                <XAxis dataKey="x" name="Time" tickFormatter={tick => new Date(tick).toLocaleTimeString()} />
                <YAxis dataKey="y" name="Number" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />
                <Scatter name="Dispositivos" data={data}>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getColor(entry.y)} />
                    ))}
                </Scatter>
                {threshold !== null && (
                    <ReferenceLine y={threshold} label={`${thresholdType} Threshold`} stroke="green" strokeWidth={3} strokeDasharray="5 5" />
                )}
                <Brush dataKey="x" height={30} stroke="#8884d8" />
            </ScatterChart>
            <div className="legend-info">
                <p><span style={{ color: 'green' }}>●</span> Threshold (Média, Mediana, Moda)</p>
                <p><span style={{ color: 'blue' }}>●</span> Abaixo do Threshold</p>
                <p><span style={{ color: 'purple' }}>●</span> Muito Abaixo do Threshold</p>
                <p><span style={{ color: 'orange' }}>●</span> Acima do Threshold</p>
                <p><span style={{ color: 'red' }}>●</span> Muito Acima do Threshold</p>
            </div>
        </div>
    );
};

export default Dispersao;
