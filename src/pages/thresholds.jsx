import React, { useState } from 'react';
import Correlacao from '../components/graficos/correla';

const CorrelacaoPage = () => {
    const [recent, setRecent] = useState(false);

    return (
        <div className=" p-6 bg-primary-fundo w-screen h-screen">
            <div className="flex justify-end mb-4">
                <button
                    className={`px-4 py-2 font-semibold rounded-lg shadow-md ${
                        recent ? 'bg-primary-boxes text-primary-azul' : 'bg-primary-boxes text-primary-amarelo'
                    }`}
                    onClick={() => setRecent(!recent)}
                >
                    {recent ? 'Mostrar Todos os Dados' : 'Mostrar Dados Recentes'}
                </button>
            </div>
            <Correlacao recent={recent} />
        </div>
    );
};

export default CorrelacaoPage;
