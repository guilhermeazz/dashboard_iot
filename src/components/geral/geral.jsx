import React, { useState } from "react";
import HistogramChart from "../graficos/histograma";
import Num from '../dados/num';
import Info from '../dados/infoDado';
import Trat from '../dados/trat';
import Hist from '../historico/historico';

const Grafico = () => {
    const [selectedGraph, setSelectedGraph] = useState("HistogramChart");

    const handleGraphSelection = (e) => {
        setSelectedGraph(e.target.value);
    };

    return (
        <div className="flex p-10 g-5">
            <div className="
                flex
                flex-col
                items-center
                g-5
                w-2/3
                h-2/3
                bg-primary-fundo
                text-white
                rounded-md
            ">
                <div className="flex flex-col items-start w-full max-w-xs mb-5">
                    <label className="text-primary-amarelo font-semibold">Selecione o tipo de gráfico:</label>
                    <select
                        className="p-2 bg-primary-boxes border border-primary-amarelo rounded w-full"
                        value={selectedGraph}
                        onChange={handleGraphSelection}
                    >
                        <option value="HistogramChart">Histograma</option>
                    </select>
                </div>

                <div className="
                    w-full
                    h-96
                    p-5
                    flex
                    justify-center
                    items-center
                    bg-primary-boxes
                    rounded-md
                ">
                    {selectedGraph === "HistogramChart" && <HistogramChart />}
                </div>
            </div>
            <div className="
                flex
                gap-10
                p-10
                w-full
                h-1/2
            ">
                <div className="
                    flex
                    flex-col
                    gap-5
                    w-1/2
                    h-full
                ">
                    <Num />
                    <Info />
                    <div className="h-40">
                        <Hist />
                    </div>
                </div>
                <div className="
                    w-1/2
                    h-full
                ">
                    <Trat />
                </div>
            </div>
        </div>
    );
};

export default Grafico;
