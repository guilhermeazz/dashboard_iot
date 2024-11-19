import React, { useState } from 'react';
import Barras from './barras';
import Linha from './linha';
import Dispersao from './dispersao';
import Histograma from './histograma';

const Grafico = () => {
    // Estado para controlar o tipo de gráfico em cada posição
    const [selectedGraphs, setSelectedGraphs] = useState(["BarChart", "LineChart"]);
    // Estado para controlar se deve exibir dados recentes ou todos os dados
    const [recentData, setRecentData] = useState([true, true]);
    // Estado para controlar o tipo de threshold a ser aplicado
    const [thresholdTypes, setThresholdTypes] = useState(["media", "media"]);

    const handleGraphSelection = (index, type) => {
        setSelectedGraphs((prev) => {
            const updated = [...prev];
            updated[index] = type;
            return updated;
        });
    };

    const handleDataToggle = (index) => {
        setRecentData((prev) => {
            const updated = [...prev];
            updated[index] = !updated[index];
            return updated;
        });
    };

    const handleThresholdTypeChange = (index, type) => {
        setThresholdTypes((prev) => {
            const updated = [...prev];
            updated[index] = type;
            return updated;
        });
    };

    const renderChartByType = (type, recent, thresholdType) => {
        switch (type) {
            case "BarChart":
                return <Barras recent={recent} thresholdType={thresholdType} />;
            case "LineChart":
                return <Linha recent={recent} thresholdType={thresholdType} />;
            case "ScatterChart":
                return <Dispersao recent={recent} thresholdType={thresholdType} />;
            case "HistogramChart":
                return <Histograma recent={recent} thresholdType={thresholdType} />;
            default:
                return null;
        }
    };

    const chartOptions = [
        { label: "Barras", value: "BarChart" },
        { label: "Linhas", value: "LineChart" },
        { label: "Dispersão", value: "ScatterChart" },
        { label: "Histograma", value: "HistogramChart" },
    ];

    const thresholdOptions = [
        { label: "Média", value: "media" },
        { label: "Mediana", value: "mediana" },
        { label: "Desvio Padrão", value: "desviop" },
        { label: "Moda", value: "moda" },
    ];

    return (
        <div className='
            flex
            flex-col
            gap-2
            p-10
            w-full
            h-full
            bg-primary-fundo
            text-white
            rounded-md'>

            <div className='flex gap-5 justify-around'>
                {[0, 1].map((index) => (
                    <div key={index} className='flex gap-5 justify-center items-center w-1/2'>
                        <label className='text-primary-amarelo font-semibold'>{`Gráfico ${index + 1}`}</label>
                        <select
                            className='p-2 bg-primary-boxes border border-primary-amarelo rounded'
                            value={selectedGraphs[index]}
                            onChange={(e) => handleGraphSelection(index, e.target.value)}
                        >
                            {chartOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <button
                            className='mt-2 p-2 bg-primary-boxes border border-primary-amarelo rounded'
                            onClick={() => handleDataToggle(index)}
                        >
                            {recentData[index] ? 'Mostrar Todos os Dados' : 'Mostrar Dados Recentes'}
                        </button>
                        <select
                            className='mt-2 p-2 bg-primary-boxes border border-primary-amarelo rounded'
                            value={thresholdTypes[index]}
                            onChange={(e) => handleThresholdTypeChange(index, e.target.value)}
                        >
                            {thresholdOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>

            <div className='flex gap-5 mt-5'>
                {[0, 1].map((index) => (
                    <div
                        key={index}
                        className='
                            w-1/2
                            h-2/3
                            p-5
                            flex
                            justify-center
                            items-center
                            bg-primary-boxes
                            rounded-md
                            aspect-square'>
                        {renderChartByType(selectedGraphs[index], recentData[index], thresholdTypes[index])}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Grafico;
