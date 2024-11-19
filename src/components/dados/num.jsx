import React, { useContext, useEffect } from 'react';
import { DataContext } from '../../services/mqttdata';

const Num = () => {
    const { numero } = useContext(DataContext);

    useEffect(() => {
        console.log('Número atualizado no componente Num:', numero);
    }, [numero]);

    return (
        <div className='
        bg-primary-boxes
        flex
        flex-col
        gap-5
        p-5
        w-full
        h-1/2
        items-center
        rounded-md'>
            <h1 className='
            text-primary-amarelo
            text-lg
            font-semibold'>
                Última Informação Recebida:
            </h1>

            <div className='flex justify-center items-center w-full h-full pb-10'>
                {numero !== null ? (
                    <h1 className='
                    text-primary-azul
                    text-7xl
                    font-bold'>
                        {numero}
                    </h1>
                ) : (
                    <h1 className='
                    text-primary-azul
                    text-7xl
                    font-bold'>
                        0.00
                    </h1>
                )}
            </div>
        </div>
    );
};

export default Num;
