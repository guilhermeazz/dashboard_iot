import React, { useContext, useEffect } from 'react';
import { DataContext } from '../../services/mqttdata';

const Info = () => {
    const {dispositivo, tempo} = useContext(DataContext);

    useEffect(() => {
        console.log('dispositivo e horario atualizados no componente InfoDado:', dispositivo, tempo);
    }, [dispositivo, tempo]);

    return (
        <div className='
            bg-primary-boxes
            text-white
            text-base
            font-normal
            flex
            flex-col
            gap-2
            w-full
            h-1/4
            p-5
            rounded-md
            items-start'>
                <h1 className='
                text-primary-amarelo
                font-medium'>Detlhes do Ultimo Dado Recebido:</h1>
                <div className='h-full w-full'>
                    <div className='
                    h-1/2'>
                        <h2 className='text-primary-azul'>Dispositivo: </h2> 
                        <p>{dispositivo}</p>
                    </div>
                    <div className='
                    h-1/2'>
                        <h2 className='text-primary-azul'>Horário:  </h2>
                        <p>{tempo}</p>
                    </div> 
                </div>
        </div>
    )
}

export default Info;